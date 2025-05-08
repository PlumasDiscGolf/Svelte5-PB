<script>
	import moment from 'moment';
	import { Icon, PencilSquare, Trash, CheckCircle, XCircle, PlusCircle, ArrowRightStartOnRectangle } from 'svelte-hero-icons';
	// Define tabs data
	const tabs = [
		{ id: 'tab1', label: 'Events' },
		{ id: 'tab2', label: 'Courses' },
		{ id: 'tab3', label: 'Posts' },
		{ id: 'tab4', label: 'Board' }
	];

	// Track active tab
	let activeTabId = $state('tab1');

	// Function to set active tab
	let setActiveTab = (tabId) => {
		activeTabId = tabId;
	};
	let { data } = $props();
</script>

<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Admin Panel</h1>
		</div>
	</div>
</div>

<!-- Admin Dashboard (hidden initially) -->
<div class="container mx-auto px-4 py-8">
	<!-- Success Message -->
	<div class="alert alert-success mb-4 hidden">
		<Icon src={CheckCircle} class="h-7 w-7 justify-self-end"></Icon>
		<span>Item saved successfully!</span>
	</div>

	<!-- Error Message -->
	<div class="alert alert-error mb-4 hidden">
		<Icon src={XCircle} class="h-7 w-7 justify-self-end"></Icon>
		<span>Error! Unable to complete operation.</span>
	</div>

	<!-- Main Content Container -->
	<div class="card bg-base-100 shadow-lg shadow-gray-400">
		<div class="card-body p-0">
			<!-- Admin Header -->
			<div class="flex items-center justify-between rounded-t-xl bg-neutral p-4 text-neutral-content">
				<h2 class="text-xl font-bold">Plumas Disc Golf Admin</h2>
				<button class="btn btn-error btn-sm flex items-center gap-2">
					<Icon src={ArrowRightStartOnRectangle} class="h-5 w-5 justify-self-end"></Icon>
					Logout
				</button>
			</div>

			<!-- Tab Navigation -->
			<div class="tabs-boxed tabs mx-2 bg-base-200 p-1">
				{#each tabs as tab}
					<button class="tab {activeTabId === tab.id ? 'tab-active' : ''}" onclick={() => setActiveTab(tab.id)}>
						{tab.label}
					</button>
				{/each}
			</div>

			<!-- Events Content Area -->
			<div class="p-2 {activeTabId === tabs[0].id ? '' : 'hidden'}">
				<!-- Add New Button -->
				<div class="mb-4 flex justify-end">
					<a href="/admin/events/new">
						<button class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>
							Add New Event
						</button>
					</a>
				</div>

				<!-- Events List -->
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<thead>
							<tr>
								<th>Name</th>
								<th>Date</th>
								<th>Type</th>
								<th>Published</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.events as event}
								<tr>
									<td>{event.name}</td>
									<td>{moment(event.startDateTime).format('MMM Do, YYYY')}</td>
									<td>{event.eventType}</td>
									<td>
										<!-- <div class="badge badge-success">Yes</div> -->
									</td>
									<td class="flex gap-2">
										<button class="btn btn-info btn-sm">
											<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
										</button>
										<button class="btn btn-error btn-sm">
											<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Courses List (hidden initially) -->
			<div class="p-4 {activeTabId === tabs[1].id ? '' : 'hidden'}">
				<!-- Add New Button -->
				<div class="mb-4 flex justify-end">
					<a href="/admin/courses/new">
						<button class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>
							Add New Course
						</button>
					</a>
				</div>
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<thead>
							<tr>
								<th>Name</th>
								<th>Holes</th>
								<th>Par</th>
								<th>Length</th>
								<th>Location</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.courses as course}
								<tr>
									<td>{course.name}</td>
									<td>{course.numberOfHoles}</td>
									<td>{course.par}</td>
									<td>{course.lengthInFeet}</td>
									<td>{course.location}</td>
									<td class="flex gap-2">
										<button class="btn btn-info btn-sm">
											<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
										</button>
										<button class="btn btn-error btn-sm">
											<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Posts List (hidden initially) -->
			<div class="p-4 {activeTabId === tabs[2].id ? '' : 'hidden'}">
				<!-- Add New Button -->
				<div class="mb-4 flex justify-end">
					<a href="/admin/posts/new">
						<button class="btn btn-secondary btn-sm flex items-center gap-2">
							<Icon src={PlusCircle} class="h-6 w-6"></Icon>
							Add New Post
						</button>
					</a>
				</div>
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th>Categories</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{#each data.posts as post}
								<tr>
									<td>{post.title}</td>
									<td>{moment(post.publishedDate).format('MMM Do, YYYY')}</td>
									<td>
										<div class="flex flex-wrap gap-1">
											<div class="badge badge-secondary">site-update</div>
											<div class="badge badge-secondary">pioneer-dgc</div>
										</div>
									</td>
									<td class="flex gap-2">
										<button class="btn btn-info btn-sm">
											<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
										</button>
										<button class="btn btn-error btn-sm">
											<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Board Management (hidden initially) -->
			<div class="p-4 {activeTabId === tabs[3].id ? '' : 'hidden'}">
				<div class="grid gap-6 md:grid-cols-2">
					<!-- Board Members -->
					<div>
						<div class="mt-4 flex justify-between">
							<h3 class="mb-4 text-xl font-bold">Board Members</h3>
							<a href="/admin/board/member/new">
								<button class="btn btn-secondary btn-sm flex items-center gap-2">
									<Icon src={PlusCircle} class="h-6 w-6"></Icon>
									Add New Member
								</button>
							</a>
						</div>
						<table class="table table-zebra w-full">
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each data.boardMembers as member}
								<tr>
									<td>{member.name}</td>
									<td>{member.title}</td>
									<td>
										<div class="badge badge-success">{member.active ? 'Active' : 'Inactive'}</div>
									</td>
									<td class="flex gap-2">
										<button class="btn btn-info btn-sm">
											<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
										</button>
										<button class="btn btn-error btn-sm">
											<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
										</button>
									</td>
								</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Board Meetings -->
					<div>
						<div class="mt-4 flex justify-between">
							<h3 class="mb-4 text-xl font-bold">Board Meetings</h3>
							<a href="/admin/board/meeting/new">
								<button class="btn btn-secondary btn-sm flex items-center gap-2">
									<Icon src={PlusCircle} class="h-6 w-6"></Icon>
									Add New Meeting
								</button>
							</a>
						</div>
						<table class="table table-zebra">
							<thead>
								<tr>
									<th>Date</th>
									<th>Documents</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{#each data.boardMeetings as meeting}
								<tr class="w-full">
									<td>{moment(meeting.meetingDateTime).format('MMM Do, YYYY')}</td>
									<td class="">
										<div class="badge badge-primary">Agenda</div>
										<div class="badge badge-secondary">Minutes</div>
									</td>
									<td class="">
										<button class="btn btn-info btn-sm">
											<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
										</button>
										<button class="btn btn-error btn-sm">
											<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
										</button>
									</td>
								</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
