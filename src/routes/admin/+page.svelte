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
							<tr>
								<td>Pioneer Disc Golf Course</td>
								<td>9</td>
								<td>27</td>
								<td>2340 ft</td>
								<td>Quincy, CA</td>
								<td class="flex gap-2">
									<button class="btn btn-info btn-sm">
										<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
									</button>
									<button class="btn btn-error btn-sm">
										<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
									</button>
								</td>
							</tr>
							<tr>
								<td>Cascades Disc Golf Course</td>
								<td>18</td>
								<td>54</td>
								<td>5280 ft</td>
								<td>Quincy, CA</td>
								<td class="flex gap-2">
									<button class="btn btn-info btn-sm">
										<Icon src={PencilSquare} class="h-4 w-4 justify-self-end"></Icon>
									</button>
									<button class="btn btn-error btn-sm">
										<Icon src={Trash} class="h-4 w-4 justify-self-end"></Icon>
									</button>
								</td>
							</tr>
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
								<th>Published</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>New Course Update</td>
								<td>Feb 15, 2025</td>
								<td>
									<div class="flex flex-wrap gap-1">
										<div class="badge badge-secondary">site-update</div>
										<div class="badge badge-secondary">pioneer-dgc</div>
									</div>
								</td>
								<td>
									<div class="badge badge-success">Yes</div>
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
							<tr>
								<td>Volunteer Day Success</td>
								<td>Jan 20, 2025</td>
								<td>
									<div class="flex flex-wrap gap-1">
										<div class="badge badge-secondary">news</div>
									</div>
								</td>
								<td>
									<div class="badge badge-success">Yes</div>
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
								<tr>
									<td>Jane Smith</td>
									<td>President</td>
									<td>
										<div class="badge badge-success">Active</div>
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
								<tr>
									<td>John Doe</td>
									<td>Vice President</td>
									<td>
										<div class="badge badge-success">Active</div>
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
						<table class="table table-zebra w-full">
							<thead>
								<tr>
									<th>Date</th>
									<th>Documents</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Mar 15, 2025</td>
									<td class="flex gap-2">
										<div class="badge badge-primary">Agenda</div>
										<div class="badge badge-secondary">Minutes</div>
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
								<tr>
									<td>Feb 15, 2025</td>
									<td class="flex gap-2">
										<div class="badge badge-primary">Agenda</div>
										<div class="badge badge-secondary">Minutes</div>
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
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Loading Spinner (hidden initially) -->
<div class="my-12 flex hidden justify-center">
	<span class="loading loading-spinner loading-lg"></span>
</div>

<!-- Board Member Edit Form (hidden initially) -->
<div class="hidden p-4">
	<div class="card bg-base-200 shadow-md">
		<div class="card-body">
			<h3 class="card-title mb-4 text-xl">Edit Board Member</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="form-control">
					<label class="label">Name</label>
					<input type="text" class="input input-bordered" value="Jane Smith" />
				</div>

				<div class="form-control">
					<label class="label">Role</label>
					<input type="text" class="input input-bordered" value="President" />
				</div>

				<div class="form-control md:col-span-2">
					<label class="label">Bio</label>
					<textarea class="textarea textarea-bordered h-32"><p>Jane has been an active member since 2020.</p></textarea>
					<label class="label">
						<span class="label-text-alt">HTML is supported</span>
					</label>
				</div>

				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Active</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>

				<div class="form-control">
					<label class="label">Member Image</label>
					<div class="flex gap-2">
						<input type="text" class="input input-bordered flex-grow" value="member_image.jpg" readonly />
						<button class="btn btn-secondary">Upload</button>
					</div>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="mt-6 flex justify-end gap-2">
				<button class="btn btn-ghost">Cancel</button>
				<button class="btn btn-primary flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
					</svg>
					Save
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Meeting Edit Form (hidden initially) -->
<div class="hidden p-4">
	<div class="card bg-base-200 shadow-md">
		<div class="card-body">
			<h3 class="card-title mb-4 text-xl">Edit Board Meeting</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="form-control">
					<label class="label">Meeting Date & Time</label>
					<input type="datetime-local" class="input input-bordered" value="2025-03-15T18:00" />
				</div>

				<div class="form-control">
					<label class="label">Agenda File</label>
					<div class="flex gap-2">
						<input type="text" class="input input-bordered flex-grow" value="march_agenda.pdf" readonly />
						<button class="btn btn-secondary">Upload</button>
					</div>
				</div>

				<div class="form-control">
					<label class="label">Minutes File</label>
					<div class="flex gap-2">
						<input type="text" class="input input-bordered flex-grow" value="march_minutes.pdf" readonly />
						<button class="btn btn-secondary">Upload</button>
					</div>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="mt-6 flex justify-end gap-2">
				<button class="btn btn-ghost">Cancel</button>
				<button class="btn btn-primary flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
					</svg>
					Save
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Course Edit Form (hidden initially) -->
<div class="hidden p-4">
	<div class="card bg-base-200 shadow-md">
		<div class="card-body">
			<h3 class="card-title mb-4 text-xl">Edit Course</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="form-control">
					<label class="label">Name</label>
					<input type="text" class="input input-bordered" value="Pioneer Disc Golf Course" />
				</div>

				<div class="form-control">
					<label class="label">Number of Holes</label>
					<input type="number" class="input input-bordered" value="9" />
				</div>

				<div class="form-control">
					<label class="label">Par</label>
					<input type="number" class="input input-bordered" value="27" />
				</div>

				<div class="form-control">
					<label class="label">Length (in feet)</label>
					<input type="number" class="input input-bordered" value="2340" />
				</div>

				<div class="form-control">
					<label class="label">City</label>
					<input type="text" class="input input-bordered" value="Quincy" />
				</div>

				<div class="form-control">
					<label class="label">State</label>
					<input type="text" class="input input-bordered" value="CA" />
				</div>

				<div class="form-control md:col-span-2">
					<label class="label">Description</label>
					<textarea class="textarea textarea-bordered h-32">Pioneer Disc Golf Course is the flagship course of Plumas Disc Golf, offering a fun and accessible experience for players of all levels.</textarea>
					<label class="label">
						<span class="label-text-alt">HTML is supported</span>
					</label>
				</div>

				<div class="form-control md:col-span-2">
					<label class="label">Tags (comma separated)</label>
					<input type="text" class="input input-bordered" value="Beginner Friendly, Technical" />
				</div>

				<div class="form-control">
					<label class="label">Course Image</label>
					<div class="flex gap-2">
						<input type="text" class="input input-bordered flex-grow" value="pioneer.jpg" readonly />
						<button class="btn btn-secondary">Upload</button>
					</div>
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="mt-6 flex justify-end gap-2">
				<button class="btn btn-ghost">Cancel</button>
				<button class="btn btn-primary flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
					</svg>
					Save
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Post Edit Form (hidden initially) -->
<div class="hidden p-4">
	<div class="card bg-base-200 shadow-md">
		<div class="card-body">
			<h3 class="card-title mb-4 text-xl">Edit Post</h3>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="form-control md:col-span-2">
					<label class="label">Title</label>
					<input type="text" class="input input-bordered" value="New Course Update" />
				</div>

				<div class="form-control">
					<label class="label">Publish Date</label>
					<input type="datetime-local" class="input input-bordered" value="2025-02-15T08:00" />
				</div>

				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Published</span>
						<input type="checkbox" class="toggle toggle-primary" checked />
					</label>
				</div>

				<div class="form-control md:col-span-2">
					<label class="label">Content</label>
					<textarea class="textarea textarea-bordered h-64"><p>Progress on our new Cascades course is coming along nicely!</p></textarea>
					<label class="label">
						<span class="label-text-alt">HTML is supported</span>
					</label>
				</div>

				<div class="form-control md:col-span-2">
					<label class="label">Categories (comma separated)</label>
					<input type="text" class="input input-bordered" value="site-update, pioneer-dgc" />
				</div>
			</div>

			<!-- Form Buttons -->
			<div class="mt-6 flex justify-end gap-2">
				<button class="btn btn-ghost">Cancel</button>
				<button class="btn btn-primary flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
					</svg>
					Save
				</button>
			</div>
		</div>
	</div>
</div>
