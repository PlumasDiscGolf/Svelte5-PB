<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
</script>
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