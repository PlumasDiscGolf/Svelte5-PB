<script>
	import { enhance } from '$app/forms';
	import { Icon, CheckCircle, XCircle, ArrowUturnLeft } from 'svelte-hero-icons';

	let { form } = $props();

	const boardRoleOptions = [
		{ value: 'None', text: '--- No Role ---' }, // Option for no role
		{ value: 'Director', text: 'Director' },
		{ value: 'President', text: 'President' },
		{ value: 'Vice President', text: 'Vice President' },
		{ value: 'Secretary', text: 'Secretary' },
		{ value: 'Treasurer', text: 'Treasurer' }
	];

	let memberName = $state(form?.memberName || '');
	// Default to 'Director'
	let memberRole = $state(form?.memberRole || 'Director');
	let memberActive = $state(form?.memberActive === undefined ? true : form.memberActive);

	// let memberAvatarFile = $state(null);
	// let avatarPreviewUrl = $state('');

	let isSaving = $state(false);

	// function handleFileSelect(e) { ... } // If using avatars
</script>

<div class="container mx-auto max-w-xl px-4 py-8">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-base-content">Add New Board Member</h1>
		<a href="/admin#boardMembers" class="btn btn-ghost btn-sm">
			<Icon src={ArrowUturnLeft} class="h-5 w-5" />
			Back to Admin
		</a>
	</div>

	{#if form?.error}
		<div class="alert alert-error mb-4 shadow-md">
			<div><Icon src={XCircle} class="mr-2 h-6 w-6 shrink-0"></Icon><span>{form.error}</span></div>
		</div>
	{/if}
	{#if form?.fieldErrors}
		<div class="alert alert-warning mb-4 shadow-md">
			<ul class="list-disc pl-5">
				{#each Object.entries(form.fieldErrors) as [field, errorMsg]}
					<li><strong>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> {errorMsg}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<form
		method="POST"
		action="?/createBoardMember"
		use:enhance={() => {
			isSaving = true;
			return async ({ update, result }) => {
				await update({ reset: result.type === 'success' && !form?.error && !form?.fieldErrors });
				isSaving = false;
				if (result.type === 'success' && !form?.error && !form?.fieldErrors) {
					memberName = '';
					memberRole = 'Director'; // Reset to default
					memberActive = true;
				}
			};
		}}
		enctype="multipart/form-data"
		class="card bg-base-200 shadow-xl"
	>
		<div class="card-body space-y-4">
			<div class="form-control">
				<label class="label" for="memberNameInput"><span class="label-text">Full Name*</span></label>
				<input name="name" type="text" id="memberNameInput" placeholder="e.g., Jane Doe" class="input input-bordered w-full" bind:value={memberName} required />
			</div>

			<div class="form-control">
				<label class="label" for="memberRoleSelect"><span class="label-text">Role/Title</span></label>
				<select name="role" id="memberRoleSelect" class="select select-bordered w-full" bind:value={memberRole}>
					{#each boardRoleOptions as roleOption (roleOption.value)}
						<option value={roleOption.value}>{roleOption.text}</option>
					{/each}
				</select>
				<span class="label-text-alt mt-1 text-xs">Select "--- No Role ---" if applicable.</span>
			</div>

			<div class="form-control items-start">
				<label class="label cursor-pointer gap-4 py-1">
					<span class="label-text">Active Member</span>
					<input name="active" type="checkbox" id="memberActiveToggle" class="toggle toggle-primary" bind:checked={memberActive} />
				</label>
			</div>

			<div class="card-actions mt-6 justify-end">
				<a href="/admin?tab=tab4" class="btn btn-ghost" disabled={isSaving}>Cancel</a>
				<button type="submit" class="btn btn-primary flex items-center gap-1.5" disabled={isSaving}>
					{#if isSaving}
						<span class="loading loading-spinner loading-xs"></span>
					{/if}
					<Icon src={CheckCircle} class="h-5 w-5" />
					Create Member
				</button>
			</div>
		</div>
	</form>
</div>
