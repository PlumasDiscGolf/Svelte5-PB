<script>
	// No explicit $state or $props import needed in .svelte files with runes
	import moment from 'moment';
	import { Icon, PencilSquare, Trash, PlusCircle, ArrowRightStartOnRectangle, CalendarDays, Map, Newspaper, UserGroup, Heart, CurrencyDollar, Users, CircleStack, ArrowDownTray, Ticket } from 'svelte-hero-icons';
	import PocketBase from 'pocketbase';
	import { page } from '$app/stores';
	import { replaceState, invalidateAll } from '$app/navigation';
	import { preventDefault } from '$lib/utils.js';

	const pb_client = new PocketBase('https://pdg.pockethost.io/');

	const adminSections = [
		{ id: 'events', label: 'Events', icon: Ticket, addNewUrl: '/admin/events/new', editUrlBase: '/admin/events/edit' },
		{ id: 'courses', label: 'Courses', icon: Map, addNewUrl: '/admin/courses/new', editUrlBase: '/admin/courses/edit' },
		{ id: 'posts', label: 'Posts', icon: Newspaper, addNewUrl: '/admin/posts/new', editUrlBase: '/admin/posts/edit' },
		{ id: 'boardMembers', label: 'Board Members', icon: UserGroup, addNewUrl: '/admin/board/members/new', editUrlBase: '/admin/board/members/edit' },
		{ id: 'boardMeetings', label: 'Board Meetings', icon: CalendarDays, addNewUrl: '/admin/board/meetings/new', editUrlBase: '/admin/board/meetings/edit' },
		{ id: 'memberships', label: 'Memberships', icon: Users, addNewUrl: '/admin/memberships/new', editUrlBase: '/admin/memberships/edit' },
		{ id: 'volunteers', label: 'Volunteers', icon: Heart, addNewUrl: '/admin/volunteers/new', editUrlBase: '/admin/volunteers/edit' },
		{ id: 'donations', label: 'Donations', icon: CurrencyDollar, addNewUrl: '/admin/donations/new', editUrlBase: '/admin/donations/edit' }
	];
	// Us the following syntax for nested menu options
	//  {
	//      id: 'board',
	//      label: 'Board Admin',
	//      icon: UserGroup,
	//      subSections: [
	//         { id: 'boardMembers', label: 'Members', addNewUrl: '/admin/board/members/new', editUrlBase: '/admin/board/members/edit'},
	//         { id: 'boardMeetings', label: 'Meetings', addNewUrl: '/admin/board/meetings/new', editUrlBase: '/admin/board/meetings/edit'}
	//     ]
	// },

	let activeSectionId = $state('events');

	$effect(() => {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash.substring(1);
			const isValidMainSection = adminSections.find((s) => s.id === hash && !s.subSections);
			const isValidSubSection = adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === hash);

			if (hash && (isValidMainSection || isValidSubSection)) {
				if (activeSectionId !== hash) activeSectionId = hash;
			} else if (adminSections.length > 0 && !activeSectionId) {
				const firstSection = adminSections.find((s) => !s.subSections) || adminSections[0];
				const initialSectionId = firstSection.subSections?.[0]?.id || firstSection.id;
				if (initialSectionId && activeSectionId !== initialSectionId) {
					activeSectionId = initialSectionId;
				}
			}
		}
	});

	function setActiveSection(sectionId) {
		activeSectionId = sectionId;
		if (typeof window !== 'undefined') {
			const newUrl = new URL(window.location.href);
			newUrl.hash = sectionId;
			replaceState(newUrl, {});
		}
	}

	let { data } = $props();

	let successAlertMessage = $state('');
	let errorAlertMessage = $state('');

	function clearAlerts() {
		successAlertMessage = '';
		errorAlertMessage = '';
	}

	$effect(() => {
		const currentUrl = $page.url;
		const createdType = currentUrl.searchParams.get('created');
		const updatedType = currentUrl.searchParams.get('updated');

		let messageSet = false;
		let localSuccessMessage = '';

		if (createdType) {
			localSuccessMessage = `${createdType.charAt(0).toUpperCase() + createdType.slice(1)} created successfully!`;
			messageSet = true;
		}
		if (updatedType) {
			localSuccessMessage = `${updatedType.charAt(0).toUpperCase() + updatedType.slice(1)} updated successfully!`;
			messageSet = true;
		}

		if (messageSet) {
			successAlertMessage = localSuccessMessage;
			const cleanUrl = new URL(currentUrl.href);
			cleanUrl.search = '';
			replaceState(cleanUrl, {});
			setTimeout(() => clearAlerts(), 3000);
		}
	});

	async function deleteItem(collectionName, itemId, itemName, itemTypeName) {
		clearAlerts();
		if (!itemId || !window.confirm(`Are you sure you want to delete ${itemTypeName} "${itemName || 'this item'}"? This action cannot be undone.`)) {
			return;
		}
		try {
			await pb_client.collection(collectionName).delete(itemId);
			successAlertMessage = `${itemTypeName} "${itemName}" deleted successfully.`;
			await invalidateAll();
			setTimeout(() => clearAlerts(), 3000);
		} catch (err) {
			console.error(`Failed to delete ${itemTypeName}:`, err);
			errorAlertMessage = `Error deleting ${itemTypeName}: ${err.message || 'Unknown error'}.`;
			if (err.data?.data) {
				let detailedErrors = Object.entries(err.data.data)
					.map(([field, errorObj]) => `${field}: ${errorObj.message}`)
					.join('; ');
				errorAlertMessage += ` Details: ${detailedErrors}`;
			}
		}
	}
</script>

<div class="container mx-auto px-4 pt-4">
	{#if successAlertMessage}
		<div class="alert alert-success mb-4 shadow-lg">
			<div><Icon src={CheckCircle} class="h-6 w-6"></Icon><span>{successAlertMessage}</span></div>
			<div class="flex-none"><button class="btn btn-ghost btn-sm" onclick={clearAlerts}>✕</button></div>
		</div>
	{/if}
	{#if errorAlertMessage}
		<div class="alert alert-error mb-4 shadow-lg">
			<div><Icon src={XCircle} class="h-6 w-6"></Icon><span>{errorAlertMessage}</span></div>
			<div class="flex-none"><button class="btn btn-ghost btn-sm" onclick={clearAlerts}>✕</button></div>
		</div>
	{/if}
</div>

<div class="hero bg-base-200 py-10 mb-4">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-4xl font-bold">Admin Panel</h1>
		</div>
	</div>
</div>

<div class="drawer lg:drawer-open">
	<input id="admin-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col p-4">
		<div class="mb-4 flex w-full items-center justify-between">
			<label for="admin-drawer" class="btn btn-primary drawer-button lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
				Menu
			</label>
			<div class="lg:hidden">
				<a href="/logout" class="btn btn-error btn-sm flex items-center gap-2">
					<Icon src={ArrowRightStartOnRectangle} class="h-5 w-5"></Icon>Logout
				</a>
			</div>
		</div>

		<div class="card w-full bg-base-100 shadow-xl">
			<div class="card-body p-0">
				<div class="flex items-center justify-between rounded-t-lg bg-neutral p-4 text-neutral-content">
					<h2 class="text-xl font-bold">
						{adminSections.find((s) => s.id === activeSectionId && !s.subSections)?.label || adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === activeSectionId)?.label || adminSections.find((s) => s.id === activeSectionId && s.subSections)?.label || 'Dashboard'}
					</h2>
					<div class="hidden lg:flex">
						<a href="/logout" class="btn btn-error btn-sm flex items-center gap-2">
							<Icon src={ArrowRightStartOnRectangle} class="h-5 w-5"></Icon>Logout
						</a>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'events' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href={adminSections.find((s) => s.id === 'events')?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Event
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Name</th><th>Date</th><th>Type</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.events && data.events.length > 0}
									{#each data.events as item (item.id)}
										<tr>
											<td>{item.name}</td>
											{#if item.endDateTime && !moment(item.startDateTime).isSame(moment(item.endDateTime), 'day')}
												<td>
													{moment(item.startDateTime).format('MMM Do, YYYY')} - {moment(item.endDateTime).format('MMM Do, YYYY')}
												</td>
											{:else}
												<td>
													{moment(item.startDateTime).format('MMM Do, YYYY')}
												</td>
											{/if}
											<td>{item.eventType}</td>

											<td class="flex gap-2">
												<a href="{adminSections.find((s) => s.id === 'events')?.editUrlBase}/{item.id}" title="Edit Event" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<button title="Delete Event" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem('events', item.id, item.name, 'Event')}>
													<Icon src={Trash} class="h-4 w-4"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center">No events found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'courses' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href={adminSections.find((s) => s.id === 'courses')?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Course
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Name</th><th>Holes</th><th>Par</th><th>Location</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.courses && data.courses.length > 0}
									{#each data.courses as item (item.id)}
										<tr>
											<td>{item.name}</td><td>{item.numberOfHoles}</td><td>{item.par}</td><td>{item.location}</td>
											<td class="flex gap-2">
												<a href="{adminSections.find((s) => s.id === 'courses')?.editUrlBase}/{item.id}" title="Edit Course" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<button title="Delete Course" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem('courses', item.id, item.name, 'Course')}>
													<Icon src={Trash} class="h-4 w-4"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center">No courses found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'posts' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href={adminSections.find((s) => s.id === 'posts')?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Post
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Title</th><th>Date</th><th>Categories</th><th>Published</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.posts && data.posts.length > 0}
									{#each data.posts as item (item.id)}
										<tr>
											<td>{item.title}</td>
											<td>{moment(item.publishedDate).format('MMM Do, YYYY')}</td>
											<td>{Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}</td>
											<td>{item.published ? 'Yes' : 'No'}</td>
											<td class="flex gap-2">
												<a href="{adminSections.find((s) => s.id === 'posts')?.editUrlBase}/{item.id}" title="Edit Post" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<button title="Delete Post" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem('posts', item.id, item.title, 'Post')}>
													<Icon src={Trash} class="h-4 w-4"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center">No posts found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'boardMembers' ? '' : 'hidden'}">
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-semibold">Board Members</h3>
						<a href={adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMembers')?.addNewUrl} class="btn btn-secondary btn-xs flex items-center gap-1">
							<Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Member
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra table-sm w-full">
							<thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.boardMembers && data.boardMembers.length > 0}
									{#each data.boardMembers as item (item.id)}
										<tr>
											<td>{item.name}</td><td>{item.role}</td>
											<td><div class="badge {item.active ? 'badge-primary' : 'badge-neutral'} badge-sm">{item.active ? 'Active' : 'Inactive'}</div></td>
											<td class="flex gap-1">
												<a href="{adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMembers')?.editUrlBase}/{item.id}" title="Edit Member" class="btn btn-square btn-info btn-xs">
													<Icon src={PencilSquare} class="h-3 w-3"></Icon>
												</a>
												<button title="Delete Member" class="btn btn-square btn-error btn-xs" onclick={() => deleteItem('boardMembers', item.id, item.name, 'Board Member')}>
													<Icon src={Trash} class="h-3 w-3"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center">No board members.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'boardMeetings' ? '' : 'hidden'}">
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-semibold">Board Meetings</h3>
						<a href={adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMeetings')?.addNewUrl} class="btn btn-secondary btn-xs flex items-center gap-1">
							<Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Meeting
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra table-sm w-full">
							<thead><tr><th>Date</th><th>Docs</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.boardMeetings && data.boardMeetings.length > 0}
									{#each data.boardMeetings as item (item.id)}
										<tr>
											<td>{moment(item.meetingDateTime).format('MMM Do, YYYY h:mm A')}</td>
											<td>
												{#if item.agendaFile}
													<a href={pb_client.files.getURL(item, item.agendaFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info inline-flex items-center text-xs">
														<Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Agenda
													</a>
												{/if}
												{#if item.minutesFile}
													<a href={pb_client.files.getURL(item, item.minutesFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info ml-2 inline-flex items-center text-xs">
														<Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Minutes
													</a>
												{/if}
											</td>
											<td class="flex gap-1">
												<a href="{adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMeetings')?.editUrlBase}/{item.id}" title="Edit Meeting" class="btn btn-square btn-info btn-xs">
													<Icon src={PencilSquare} class="h-3 w-3"></Icon>
												</a>
												<button title="Delete Meeting" class="btn btn-square btn-error btn-xs" onclick={() => deleteItem('boardMeetings', item.id, moment(item.meetingDateTime).format('MMM Do, YYYY'), 'Board Meeting')}>
													<Icon src={Trash} class="h-3 w-3"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="3" class="p-4 text-center">No board meetings.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'memberships' ? '' : 'hidden'}">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Club Memberships</h3>
						<a href={adminSections.find((s) => s.id === 'memberships')?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add Membership
						</a>
					</div>
					<p class="text-base-content/70">Membership management interface, table, and filters will go here...</p>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Name</th><th>Status</th><th>Expires</th><th>Actions</th></tr></thead><tbody><tr><td colspan="4" class="p-4 text-center italic">No memberships yet.</td></tr></tbody></table></div>
				</div>
				<div class="p-4 {activeSectionId === 'volunteers' ? '' : 'hidden'}">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Volunteers</h3>
						<a href={adminSections.find((s) => s.id === 'volunteers')?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add Volunteer Record
						</a>
					</div>
					<p class="text-base-content/70">Volunteer tracking and assignment interface will go here...</p>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Name</th><th>Event/Task</th><th>Date</th><th>Actions</th></tr></thead><tbody><tr><td colspan="4" class="p-4 text-center italic">No volunteer records yet.</td></tr></tbody></table></div>
				</div>
				<div class="p-4 {activeSectionId === 'donations' ? '' : 'hidden'}">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Donations</h3>
						<a href={adminSections.find((s) => s.id === 'donations')?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Log Donation
						</a>
					</div>
					<p class="text-base-content/70">Donation tracking and management interface will go here...</p>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Donor</th><th>Amount</th><th>Date</th><th>Type</th><th>Actions</th></tr></thead><tbody><tr><td colspan="5" class="p-4 text-center italic">No donations yet.</td></tr></tbody></table></div>
				</div>
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-60 bg-base-200 p-4 text-base-content md:w-64">
			<li class="menu-title text-sm"><span>Admin Menu</span></li>
			{#each adminSections as section (section.id)}
				{#if section.subSections}
					<li>
						<details open={section.subSections.some((sub) => sub.id === activeSectionId)}>
							<summary class="text-base font-medium {section.subSections.some((sub) => sub.id === activeSectionId) ? 'active' : ''}">
								<Icon src={section.icon || CircleStack} class="h-5 w-5" />
								{section.label}
							</summary>
							<ul class="!pl-2">
								{#each section.subSections as subSection (subSection.id)}
									<li>
										<a href="#{subSection.id}" class:active={activeSectionId === subSection.id} onclick={preventDefault(() => setActiveSection(subSection.id))}>
											{subSection.label}
										</a>
									</li>
								{/each}
							</ul>
						</details>
					</li>
				{:else}
					<li>
						<a href="#{section.id}" class:active={activeSectionId === section.id} onclick={preventDefault(() => setActiveSection(section.id))}>
							<Icon src={section.icon || CircleStack} solid class="h-5 w-5" />
							{section.label}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</div>
