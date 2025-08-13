<script>
	import { format, parseISO, isSameDay } from 'date-fns';
	import { Icon, PencilSquare, Trash, PlusCircle, ArrowRightStartOnRectangle, CalendarDays, Map, Newspaper, UserGroup, Heart, CurrencyDollar, Users, CircleStack, ArrowDownTray, Ticket } from 'svelte-hero-icons';
	import PocketBase from 'pocketbase';
	import { page } from '$app/stores';
	import { replaceState, invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
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

	let { data, form } = $props();

	let successAlertMessage = $state('');
	let errorAlertMessage = $state('');

	function clearAlerts() {
		successAlertMessage = '';
		errorAlertMessage = '';
	}

	$effect(() => {
		if (form?.success) {
			successAlertMessage = 'Item deleted successfully.';
			setTimeout(() => clearAlerts(), 3000);
		}
		if (form?.error) {
			errorAlertMessage = form.error;
			setTimeout(() => clearAlerts(), 3000);
		}
	});

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

<div class="hero mb-4 bg-base-200 py-10">
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
						<a href="/admin/events/new" class="btn btn-secondary btn-sm flex items-center gap-2"><Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Event</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Name</th><th>Date</th><th>Type</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.events && data.events.length > 0}
									{#each data.events as item (item.id)}
										<tr>
											<td>{item.name}</td>
											<td>
												{#if item.startDateTime}
													{#if item.endDateTime && !isSameDay(parseISO(item.startDateTime), parseISO(item.endDateTime))}
														{format(parseISO(item.startDateTime), 'MMM do, yyyy')} - {format(parseISO(item.endDateTime), 'MMM do, yyyy')}
													{:else}
														{format(parseISO(item.startDateTime), 'MMM do, yyyy')}
													{/if}
												{/if}
											</td>
											<td>{item.eventType}</td>
											<td class="flex gap-2">
												<a href="/admin/events/edit/{item.id}" title="Edit Event" class="btn btn-square btn-info btn-sm"><Icon src={PencilSquare} class="h-4 w-4"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete "${item.name}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="events" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Event" class="btn btn-square btn-error btn-sm"><Icon src={Trash} class="h-4 w-4"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center">No events found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>

				<div class="p-4 {activeSectionId === 'courses' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/courses/new" class="btn btn-secondary btn-sm flex items-center gap-2"><Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Course</a>
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
												<a href="/admin/courses/edit/{item.id}" title="Edit Course" class="btn btn-square btn-info btn-sm"><Icon src={PencilSquare} class="h-4 w-4"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete "${item.name}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="courses" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Course" class="btn btn-square btn-error btn-sm"><Icon src={Trash} class="h-4 w-4"></Icon></button>
												</form>
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
						<a href="/admin/posts/new" class="btn btn-secondary btn-sm flex items-center gap-2"><Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Post</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Title</th><th>Date</th><th>Published</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.posts && data.posts.length > 0}
									{#each data.posts as item (item.id)}
										<tr>
											<td>{item.title}</td>
											<td
												>{#if item.publishedDate}{format(parseISO(item.publishedDate), 'MMM do, yyyy')}{/if}</td
											>
											<td>{item.published ? 'Yes' : 'No'}</td>
											<td class="flex gap-2">
												<a href="/admin/posts/edit/{item.id}" title="Edit Post" class="btn btn-square btn-info btn-sm"><Icon src={PencilSquare} class="h-4 w-4"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete "${item.title}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="posts" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Post" class="btn btn-square btn-error btn-sm"><Icon src={Trash} class="h-4 w-4"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center">No posts found.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>
				<div class="p-4 {activeSectionId === 'boardMembers' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/board/members/new" class="btn btn-secondary btn-sm"><Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add New Member</a>
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
												<a href="/admin/board/members/edit/{item.id}" title="Edit Member" class="btn btn-square btn-info btn-xs"><Icon src={PencilSquare} class="h-3 w-3"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete "${item.name}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="board_members" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Member" class="btn btn-square btn-error btn-xs"><Icon src={Trash} class="h-3 w-3"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center">No board members.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>
				<div class="p-4 {activeSectionId === 'boardMeetings' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/board/meetings/new" class="btn btn-secondary btn-sm"><Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Add New Meeeting</a>
					</div>
					<div class="overflow-x-auto">
						<table class="table table-zebra table-sm w-full">
							<thead><tr><th>Date</th><th>Docs</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.boardMeetings && data.boardMeetings.length > 0}
									{#each data.boardMeetings as item (item.id)}
										<tr>
											<td
												>{#if item.meetingDateTime}{format(parseISO(item.meetingDateTime), 'MMM do, yyyy h:mm a')}{/if}</td
											>
											<td>
												{#if item.agendaFile}<a href={pb_client.files.getURL(item, item.agendaFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info inline-flex items-center text-xs"><Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Agenda</a>{/if}
												{#if item.minutesFile}<a href={pb_client.files.getURL(item, item.minutesFile)} target="_blank" rel="noopener noreferrer" class="link-hover link link-info ml-2 inline-flex items-center text-xs"><Icon src={ArrowDownTray} class="mr-1 h-4 w-4" />Minutes</a>{/if}
											</td>
											<td class="flex gap-1">
												<a href="/admin/board/meetings/edit/{item.id}" title="Edit Meeting" class="btn btn-square btn-info btn-xs"><Icon src={PencilSquare} class="h-3 w-3"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete meeting from ${item.meetingDateTime ? format(parseISO(item.meetingDateTime), 'MMM do, yyyy') : 'this date'}?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="board_meetings" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Meeting" class="btn btn-square btn-error btn-xs"><Icon src={Trash} class="h-3 w-3"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="3" class="p-4 text-center">No board meetings.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>
				<div class="p-4 {activeSectionId === 'memberships' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/memberships/new" class="btn btn-secondary btn-sm flex items-center gap-2"><Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Membership</a>
					</div>
					<div class="mt-4 overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead>
								<tr>
									<th>Name</th>
									<th>Status</th>
									<th>Member Since</th>
									<th>Expires</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{#if data.memberships && data.memberships.length > 0}
									{#each data.memberships as item (item.id)}
										<tr>
											<td>{item.name}</td>
											<td>
												<div class="badge {item.active ? 'badge-primary' : 'badge-neutral'} badge-sm">
													{item.active ? 'Active' : 'Inactive'}
												</div>
											</td>
											<td>
												{#if item.memberSince && typeof item.memberSince === 'string' && item.memberSince.length > 0}
													{format(parseISO(item.memberSince), 'MMM do, yyyy')}
												{/if}
											</td>
											<td>
												{#if item.expires && typeof item.expires === 'string' && item.expires.length > 0}
													{format(parseISO(item.expires), 'MMM do, yyyy')}
												{/if}
											</td>
											<td class="flex gap-2">
												<a href="{adminSections.find((s) => s.id === 'memberships')?.editUrlBase}/{item.id}" title="Edit Membership" class="btn btn-square btn-info btn-sm">
													<Icon src={PencilSquare} class="h-4 w-4"></Icon>
												</a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete membership for "${item.name}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="memberships" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Membership" class="btn btn-square btn-error btn-sm">
														<Icon src={Trash} class="h-4 w-4"></Icon>
													</button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}
									<tr><td colspan="4" class="p-4 text-center italic">No memberships yet.</td></tr>
								{/if}
							</tbody>
						</table>
					</div>
				</div>
				<div class="p-4 {activeSectionId === 'volunteers' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/volunteers/new" class="btn btn-secondary btn-sm flex items-center gap-2"><Icon src={PlusCircle} class="h-6 w-6"></Icon>Log Volunteer Record</a>
					</div>
					<div class="mt-4 overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Name</th><th>Event/Task</th><th>Date</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.volunteers && data.volunteers.length > 0}
									{#each data.volunteers as item (item.id)}
										<tr>
											<td>{item.name}</td>
											<td>{item.task}</td>
											<td
												>{#if item.date}{format(parseISO(item.date), 'MMM do, yyyy')}{/if}</td
											>
											<td class="flex gap-2">
												<a href="/admin/volunteers/edit/{item.id}" title="Edit Volunteer" class="btn btn-square btn-info btn-sm"><Icon src={PencilSquare} class="h-4 w-4"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete record for "${item.name}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="volunteers" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Volunteer" class="btn btn-square btn-error btn-sm"><Icon src={Trash} class="h-4 w-4"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="4" class="p-4 text-center italic">No volunteer records yet.</td></tr>{/if}
							</tbody>
						</table>
					</div>
				</div>
				<div class="p-4 {activeSectionId === 'donations' ? '' : 'hidden'}">
					<div class="mb-4 flex justify-end">
						<a href="/admin/donations/new" class="btn btn-secondary btn-sm"><Icon src={PlusCircle} class="mr-1 h-5 w-5"></Icon>Log Donation</a>
					</div>
					<div class="mt-4 overflow-x-auto">
						<table class="table table-zebra w-full">
							<thead><tr><th>Donor</th><th>Amount</th><th>Date</th><th>Type</th><th>Actions</th></tr></thead>
							<tbody>
								{#if data.donations && data.donations.length > 0}
									{#each data.donations as item (item.id)}
										<tr>
											<td>{item.donorName}</td>
											<td
												>{#if item.amount != null}${parseFloat(String(item.amount).replace(/[^0-9.-]+/g, '')).toFixed(2)}{/if}</td
											>
											<td
												>{#if item.donationDate}{format(parseISO(item.donationDate), 'MMM do, yyyy')}{/if}</td
											>
											<td>{item.donationType}</td>
											<td class="flex gap-2">
												<a href="/admin/donations/edit/{item.id}" title="Edit Donation" class="btn btn-square btn-info btn-sm"><Icon src={PencilSquare} class="h-4 w-4"></Icon></a>
												<form
													method="POST"
													action="?/delete"
													use:enhance
													onsubmit={(e) => {
														if (!window.confirm(`Delete donation from "${item.donorName}"?`)) e.preventDefault();
													}}
												>
													<input type="hidden" name="collectionName" value="donations" />
													<input type="hidden" name="itemId" value={item.id} />
													<button type="submit" title="Delete Donation" class="btn btn-square btn-error btn-sm"><Icon src={Trash} class="h-4 w-4"></Icon></button>
												</form>
											</td>
										</tr>
									{/each}
								{:else}<tr><td colspan="5" class="p-4 text-center italic">No donations yet.</td></tr>{/if}
							</tbody>
						</table>
					</div>
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
