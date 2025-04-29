<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<!-- Event Edit Form -->
			<div class="p-4">
				<div class="card bg-base-200 shadow-md">
					<div class="card-body">
						<h3 class="card-title mb-4 text-xl">Edit Event</h3>

						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="form-control">
								<label class="label" for="eventName">Name</label>
								<input type="text" id="eventName" class="input input-bordered" value="Bag Tag League Opener" />
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