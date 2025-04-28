<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Admin Panel</h1>
		</div>
	</div>
</div>

<!-- Login Form -->
<!-- <div class="mt-12 flex justify-center">
	<div class="card w-full max-w-md bg-base-100 shadow-lg shadow-gray-400">
		<div class="card-body">
			<h2 class="card-title mb-4 flex justify-center text-2xl">Login to Admin Panel</h2>

			<div class="alert alert-error mb-4 hidden">
				<span>Invalid username or password</span>
			</div>

			<form class="space-y-4">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input type="text" id="username" class="input input-bordered" required />
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input type="password" id="password" class="input input-bordered" required />
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary"> Login </button>
				</div>
			</form>
		</div>
	</div>
</div> -->

<!-- Admin Dashboard (hidden initially) -->
<div class="container mx-auto px-4 py-8">
	<!-- Success Message -->
	<div class="alert alert-success mb-4 hidden">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>Item saved successfully!</span>
	</div>

	<!-- Error Message -->
	<div class="alert alert-error mb-4 hidden">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>Error! Unable to complete operation.</span>
	</div>

	<!-- Main Content Container -->
	<div class="card bg-base-100 shadow-lg shadow-gray-400">
		<div class="card-body p-0">
			<!-- Admin Header -->
			<div class="flex items-center justify-between rounded-t-xl bg-neutral p-4 text-neutral-content">
				<h2 class="text-xl font-bold">Plumas Disc Golf Admin</h2>
				<button class="btn btn-error btn-sm flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
					Logout
				</button>
			</div>

			<!-- Tab Navigation -->
			<div class="tabs-boxed tabs bg-base-200 p-2">
				<button class="tab tab-active">Events</button>
				<button class="tab">Courses</button>
				<button class="tab">Posts</button>
				<button class="tab">Board</button>
			</div>

			<!-- Content Area -->
			<div class="p-4">
				<!-- Add New Button -->
				<div class="mb-4 flex justify-end">
					<button class="btn btn-primary flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Add New Event
					</button>
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
							<tr>
								<td>Bag Tag League Opener</td>
								<td>Apr 5, 2025</td>
								<td>League</td>
								<td>
									<div class="badge badge-success">Yes</div>
								</td>
								<td class="flex gap-2">
									<button class="btn btn-info btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</td>
							</tr>
							<tr>
								<td>Plumas Series #1</td>
								<td>Mar 22, 2025</td>
								<td>Tournament</td>
								<td>
									<div class="badge badge-success">Yes</div>
								</td>
								<td class="flex gap-2">
									<button class="btn btn-info btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Event Edit Form (hidden initially) -->
			<div class="p-4">
				<div class="card bg-base-200 shadow-md">
					<div class="card-body">
						<h3 class="card-title mb-4 text-xl">Edit Event</h3>

						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="form-control">
								<label class="label">Name</label>
								<input type="text" class="input input-bordered" value="Bag Tag League Opener" />
							</div>

							<div class="form-control">
								<label class="label">Event Type</label>
								<select class="select select-bordered">
									<option>Tournament</option>
									<option selected>League</option>
									<option>Clinic</option>
									<option>Work Party</option>
								</select>
							</div>

							<div class="form-control">
								<label class="label">Start Date & Time</label>
								<input type="datetime-local" class="input input-bordered" value="2025-04-05T10:00" />
							</div>

							<div class="form-control">
								<label class="label">End Date & Time</label>
								<input type="datetime-local" class="input input-bordered" value="2025-04-05T14:00" />
							</div>

							<div class="form-control md:col-span-2">
								<label class="label">Description</label>
								<textarea class="textarea textarea-bordered h-32">Season opener for the bag tag league</textarea>
								<label class="label">
									<span class="label-text-alt">HTML is supported</span>
								</label>
							</div>

							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">Published</span>
									<input type="checkbox" class="toggle toggle-primary" checked />
								</label>
							</div>

							<div class="form-control">
								<label class="label">Event Image</label>
								<div class="flex gap-2">
									<input type="text" class="input input-bordered flex-grow" value="No file selected" readonly />
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

			<!-- Courses List (hidden initially) -->
			<div class="p-4">
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
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
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
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Posts List (hidden initially) -->
			<div class="p-4">
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
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
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
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
										</svg>
									</button>
									<button class="btn btn-error btn-sm">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- Board Management (hidden initially) -->
			<div class="p-4">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<!-- Board Members -->
					<div>
						<h3 class="mb-4 text-xl font-bold">Board Members</h3>
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
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
										<button class="btn btn-error btn-sm">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
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
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
										<button class="btn btn-error btn-sm">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="mt-4">
							<button class="btn btn-secondary btn-sm flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Add New Member
							</button>
						</div>
					</div>

					<!-- Board Meetings -->
					<div>
						<h3 class="mb-4 text-xl font-bold">Board Meetings</h3>
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
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
										<button class="btn btn-error btn-sm">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
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
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
										<button class="btn btn-error btn-sm">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="mt-4">
							<button class="btn btn-secondary btn-sm flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Add New Meeting
							</button>
						</div>
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
<div class="p-4">
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
<div class="p-4">
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
<div class="p-4">
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
<div class="p-4">
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
