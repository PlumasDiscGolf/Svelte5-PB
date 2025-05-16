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
			// Invalidate data for the specific active section or all for simplicity
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

	// Helper function to build pagination links dynamically
	function getPaginationLink(sectionId, targetPage) {
		const sectionConfig = adminSections.find((s) => s.id === sectionId && !s.subSections) || adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === sectionId);
		if (!sectionConfig) return '#'; // Should not happen

		const queryParamKey = `${sectionConfig.dataKey.replace('Data', '')}Page`; // e.g., eventsPage, coursesPage

		const currentUrl = new URL($page.url.href);
		currentUrl.searchParams.set(queryParamKey, targetPage.toString());
		currentUrl.hash = sectionId; // Preserve current active section in hash
		return currentUrl.pathname + currentUrl.search + currentUrl.hash;
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

<div class="hero bg-base-200 py-10">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-4xl font-bold">Admin Panel</h1>
			{#if data.user}
				<p class="pt-1 text-sm text-base-content/80">Logged in as: {data.user.email}</p>
			{/if}
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
					{#if true}
						{@const sectionConfig = adminSections.find((s) => s.id === 'events')}
						<div class="mb-4 flex justify-end">
							<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
								<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Event
							</a>
						</div>
						<div class="overflow-x-auto">
							<table class="table table-zebra w-full">
								<thead><tr><th>Name</th><th>Date</th><th>Type</th><th>Published</th><th>Actions</th></tr></thead>
								<tbody>
									{#if data.eventsData && data.eventsData.items && data.eventsData.items.length > 0}
										{#each data.eventsData.items as item (item.id)}
											<tr>
												<td>{item.name}</td>
												<td>{moment(item.startDateTime).format('MMM Do, YY h:mm A')}</td>
												<td>{item.eventType}</td>
												<td>{item.published ? 'Yes' : 'No'}</td>
												<td class="flex gap-2">
													<a href="{sectionConfig?.editUrlBase}/{item.id}" title="Edit Event" class="btn btn-square btn-info btn-sm">
														<Icon src={PencilSquare} class="h-4 w-4"></Icon>
													</a>
													<button title="Delete Event" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem(sectionConfig?.collectionName, item.id, item.name, sectionConfig?.singularName)}>
														<Icon src={Trash} class="h-4 w-4"></Icon>
													</button>
												</td>
											</tr>
										{/each}
									{:else}<tr><td colspan="5" class="p-4 text-center">No events found.</td></tr>{/if}
								</tbody>
							</table>
						</div>
						{#if data.eventsData && data.eventsData.totalPages > 1}
							<div class="join mt-4 flex justify-center">
								<a href={getPaginationLink('events', data.eventsData.page - 1)} class="btn join-item btn-sm {data.eventsData.page <= 1 ? 'btn-disabled' : ''}" aria-disabled={data.eventsData.page <= 1}><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
								{#each Array(data.eventsData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('events', pageNum)} class="btn join-item btn-sm {pageNum === data.eventsData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
								<a href={getPaginationLink('events', data.eventsData.page + 1)} class="btn join-item btn-sm {data.eventsData.page >= data.eventsData.totalPages ? 'btn-disabled' : ''}" aria-disabled={data.eventsData.page >= data.eventsData.totalPages}>Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
							</div>
							<p class="mt-2 text-center text-xs">Page {data.eventsData.page} of {data.eventsData.totalPages} (Total: {data.eventsData.totalItems} events)</p>
						{/if}
					{/if}
				</div>
				{#if data.eventsData && data.eventsData.totalPages > 1}
					<div class="join mt-4 flex justify-center">
						<a href={getPaginationLink('events', data.eventsData.page - 1)} class="btn join-item btn-sm {data.eventsData.page <= 1 ? 'btn-disabled' : ''}" aria-disabled={data.eventsData.page <= 1}><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
						{#each Array(data.eventsData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('events', pageNum)} class="btn join-item btn-sm {pageNum === data.eventsData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
						<a href={getPaginationLink('events', data.eventsData.page + 1)} class="btn join-item btn-sm {data.eventsData.page >= data.eventsData.totalPages ? 'btn-disabled' : ''}" aria-disabled={data.eventsData.page >= data.eventsData.totalPages}>Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
					</div>
					<p class="mt-2 text-center text-xs">Page {data.eventsData.page} of {data.eventsData.totalPages} (Total: {data.eventsData.totalItems} events)</p>
				{/if}
			</div>

			<div class="p-4 {activeSectionId === 'courses' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.find((s) => s.id === 'courses')}
					<div class="mb-4 flex justify-end">
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Course
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Name</th><th>Holes</th><th>Par</th><th>Location</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.coursesData && data.coursesData.items && data.coursesData.items.length > 0}
									{#each data.coursesData.items as item (item.id)}
										<tr>
											<td>{item.name}</td><td>{item.numberOfHoles}</td><td>{item.par}</td><td>{item.location}</td>
											<td class="flex gap-2">
												<a href="{sectionConfig?.editUrlBase}/{item.id}" title="Edit Course" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<button title="Delete Course" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem(sectionConfig?.collectionName, item.id, item.name, sectionConfig?.singularName)}>
													<Icon src={Trash} class="h-4 w-4"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center">No courses found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
					{#if data.coursesData && data.coursesData.totalPages > 1}
						<div class="join mt-4 flex justify-center">
							<a href={getPaginationLink('courses', data.coursesData.page - 1)} class="btn join-item btn-sm {data.coursesData.page <= 1 ? 'btn-disabled' : ''}"><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
							{#each Array(data.coursesData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('courses', pageNum)} class="btn join-item btn-sm {pageNum === data.coursesData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
							<a href={getPaginationLink('courses', data.coursesData.page + 1)} class="btn join-item btn-sm {data.coursesData.page >= data.coursesData.totalPages ? 'btn-disabled' : ''}">Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
						</div>
						<p class="mt-2 text-center text-xs">Page {data.coursesData.page} of {data.coursesData.totalPages} (Total: {data.coursesData.totalItems} courses)</p>
					{/if}
				{/if}
			</div>

			<div class="p-4 {activeSectionId === 'posts' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.find((s) => s.id === 'posts')}
					<div class="mb-4 flex justify-end">
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Post
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Title</th><th>Date</th><th>Categories</th><th>Published</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.postsData && data.postsData.items && data.postsData.items.length > 0}
									{#each data.postsData.items as item (item.id)}
										<tr>
											<td>{item.title}</td>
											<td>{moment(item.publishedDate).format('MMM Do, YY')}</td>
											<td>{Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}</td>
											<td>{item.published ? 'Yes' : 'No'}</td>
											<td class="flex gap-2">
												<a href="{sectionConfig?.editUrlBase}/{item.id}" title="Edit Post" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<button title="Delete Post" class="btn btn-square btn-error btn-sm" onclick={() => deleteItem(sectionConfig?.collectionName, item.id, item.title, sectionConfig?.singularName)}>
													<Icon src={Trash} class="h-4 w-4"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center">No posts found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
					{#if data.postsData && data.postsData.totalPages > 1}
						<div class="join mt-4 flex justify-center">
							<a href={getPaginationLink('posts', data.postsData.page - 1)} class="btn join-item btn-sm {data.postsData.page <= 1 ? 'btn-disabled' : ''}"><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
							{#each Array(data.postsData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('posts', pageNum)} class="btn join-item btn-sm {pageNum === data.postsData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
							<a href={getPaginationLink('posts', data.postsData.page + 1)} class="btn join-item btn-sm {data.postsData.page >= data.postsData.totalPages ? 'btn-disabled' : ''}">Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
						</div>
						<p class="mt-2 text-center text-xs">Page {data.postsData.page} of {data.postsData.totalPages} (Total: {data.postsData.totalItems} posts)</p>
					{/if}
				{/if}
			</div>

			<div class="p-4 {activeSectionId === 'boardMembers' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMembers')}
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-semibold">Board Members</h3>
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-xs flex items-center gap-1">
							<Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Member
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra table-sm w-full">
							<thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.boardMembersData && data.boardMembersData.items && data.boardMembersData.items.length > 0}
									{#each data.boardMembersData.items as item (item.id)}
										<tr>
											<td>{item.name}</td><td>{item.role}</td>
											<td><div class="badge {item.active ? 'badge-success' : 'badge-ghost'} badge-sm">{item.active ? 'Active' : 'Inactive'}</div></td>
											<td class="flex gap-1">
												<a href="{sectionConfig?.editUrlBase}/{item.id}" title="Edit Member" class="btn btn-square btn-info btn-xs">
													<Icon src={PencilSquare} class="h-3 w-3"></Icon>
												</a>
												<button title="Delete Member" class="btn btn-square btn-error btn-xs" onclick={() => deleteItem(sectionConfig?.collectionName, item.id, item.name, sectionConfig?.singularName)}>
													<Icon src={Trash} class="h-3 w-3"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center">No board members.</td></tr>{/if}
							</tbody>
						</table>
					</div>
					{#if data.boardMembersData && data.boardMembersData.totalPages > 1}
						<div class="join mt-4 flex justify-center">
							<a href={getPaginationLink('boardMembers', data.boardMembersData.page - 1)} class="btn join-item btn-sm {data.boardMembersData.page <= 1 ? 'btn-disabled' : ''}"><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
							{#each Array(data.boardMembersData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('boardMembers', pageNum)} class="btn join-item btn-sm {pageNum === data.boardMembersData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
							<a href={getPaginationLink('boardMembers', data.boardMembersData.page + 1)} class="btn join-item btn-sm {data.boardMembersData.page >= data.boardMembersData.totalPages ? 'btn-disabled' : ''}">Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
						</div>
						<p class="mt-2 text-center text-xs">Page {data.boardMembersData.page} of {data.boardMembersData.totalPages} (Total: {data.boardMembersData.totalItems} members)</p>
					{/if}
				{/if}
			</div>

			<div class="p-4 {activeSectionId === 'boardMeetings' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.flatMap((s) => s.subSections || []).find((sub) => sub.id === 'boardMeetings')}
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-semibold">Board Meetings</h3>
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-xs flex items-center gap-1">
							<Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Meeting
						</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra table-sm w-full">
							<thead><tr><th>Date</th><th>Docs</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.boardMeetingsData && data.boardMeetingsData.items && data.boardMeetingsData.items.length > 0}
									{#each data.boardMeetingsData.items as item (item.id)}
										<tr>
											<td>{moment(item.meetingDateTime).format('MMM Do, YY h:mm A')}</td>
											<td>
												{#if item.agendaFile}
													<a href={pb_client.files.getUrl(item, item.agendaFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info inline-flex items-center text-xs">
														<Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Agenda
													</a>
												{/if}
												{#if item.minutesFile}
													<a href={pb_client.files.getUrl(item, item.minutesFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info ml-2 inline-flex items-center text-xs">
														<Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Minutes
													</a>
												{/if}
											</td>
											<td class="flex gap-1">
												<a href="{sectionConfig?.editUrlBase}/{item.id}" title="Edit Meeting" class="btn btn-square btn-info btn-xs">
													<Icon src={PencilSquare} class="h-3 w-3"></Icon>
												</a>
												<button title="Delete Meeting" class="btn btn-square btn-error btn-xs" onclick={() => deleteItem(sectionConfig?.collectionName, item.id, moment(item.meetingDateTime).format('MMM Do, YY'), sectionConfig?.singularName)}>
													<Icon src={Trash} class="h-3 w-3"></Icon>
												</button>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="3" class="p-4 text-center">No board meetings.</td></tr>{/if}
							</tbody>
						</table>
					</div>
					{#if data.boardMeetingsData && data.boardMeetingsData.totalPages > 1}
						<div class="join mt-4 flex justify-center">
							<a href={getPaginationLink('boardMeetings', data.boardMeetingsData.page - 1)} class="btn join-item btn-sm {data.boardMeetingsData.page <= 1 ? 'btn-disabled' : ''}"><Icon src={ChevronLeft} class="h-4 w-4" /> Prev</a>
							{#each Array(data.boardMeetingsData.totalPages) as _, i}{@const pageNum = i + 1}<a href={getPaginationLink('boardMeetings', pageNum)} class="btn join-item btn-sm {pageNum === data.boardMeetingsData.page ? 'btn-primary btn-active' : ''}">{pageNum}</a>{/each}
							<a href={getPaginationLink('boardMeetings', data.boardMeetingsData.page + 1)} class="btn join-item btn-sm {data.boardMeetingsData.page >= data.boardMeetingsData.totalPages ? 'btn-disabled' : ''}">Next <Icon src={ChevronRight} class="h-4 w-4" /></a>
						</div>
						<p class="mt-2 text-center text-xs">Page {data.boardMeetingsData.page} of {data.boardMeetingsData.totalPages} (Total: {data.boardMeetingsData.totalItems} meetings)</p>
					{/if}
				{/if}
			</div>

			<div class="p-4 {activeSectionId === 'memberships' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.find((s) => s.id === 'memberships')}
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Club Memberships</h3>
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add Membership
						</a>
					</div>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Name</th><th>Status</th><th>Expires</th><th>Actions</th></tr></thead><tbody><tr><td colspan="4" class="p-4 text-center italic">No memberships yet. (Data source: `data.membershipsData`)</td></tr></tbody></table></div>
				{/if}
			</div>
			<div class="p-4 {activeSectionId === 'volunteers' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.find((s) => s.id === 'volunteers')}
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Volunteers</h3>
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add Volunteer Record
						</a>
					</div>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Name</th><th>Event/Task</th><th>Date</th><th>Actions</th></tr></thead><tbody><tr><td colspan="4" class="p-4 text-center italic">No volunteer records yet. (Data source: `data.volunteersData`)</td></tr></tbody></table></div>
				{/if}
			</div>
			<div class="p-4 {activeSectionId === 'donations' ? '' : 'hidden'}">
				{#if true}
					{@const sectionConfig = adminSections.find((s) => s.id === 'donations')}
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-xl font-semibold">Manage Donations</h3>
						<a href={sectionConfig?.addNewUrl} class="btn btn-secondary btn-sm">
							<Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Log Donation
						</a>
					</div>
					<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Donor</th><th>Amount</th><th>Date</th><th>Type</th><th>Actions</th></tr></thead><tbody><tr><td colspan="5" class="p-4 text-center italic">No donations yet. (Data source: `data.donationsData`)</td></tr></tbody></table></div>
				{/if}
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
						<summary class:active={section.subSections.some((sub) => sub.id === activeSectionId)} class="text-base font-medium">
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
						<Icon src={section.icon || CircleStack} class="h-5 w-5" />
						{section.label}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</div>
