<script>
    import { enhance } from '$app/forms';
    import { Icon, CheckCircle, XCircle, ArrowUturnLeft } from 'svelte-hero-icons';

    let { data, form } = $props(); // data.member from load, form from action

    const boardRoles = ['Director', 'President', 'Vice President', 'Secretary', 'Treasurer',''];

    let memberName = $state(form?.memberName || data.member?.name || '');
    let memberRole = $state(form?.memberRole || data.member?.role || '');
    let memberActive = $state(form?.memberActive === undefined ? (data.member?.active === undefined ? true : data.member.active) : form.memberActive);
    
    // let memberAvatarFile = $state(null); // If using avatars
    // let avatarPreviewUrl = $state( // If using avatars
    //     (data.member?.avatar && data.member?.id && data.member?.collectionId) ? 
    //     `https://pdg.pockethost.io/api/files/${data.member.collectionId}/${data.member.id}/${data.member.avatar}?thumb=100x100` : ''
    // );
    // let existingAvatarName = $state(data.member?.avatar || '');


    let isSaving = $state(false);

    // function handleFileSelect(e) { // If using avatars
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         memberAvatarFile = file;
    //         avatarPreviewUrl = URL.createObjectURL(file);
    //     } else {
    //         memberAvatarFile = null;
    //         avatarPreviewUrl = (data.member?.avatar && data.member?.id && data.member?.collectionId) ? 
    //             `https://pdg.pockethost.io/api/files/${data.member.collectionId}/${data.member.id}/${data.member.avatar}?thumb=100x100` : '';
    //     }
    // }
</script>

<div class="container mx-auto px-4 py-8 max-w-xl">
    <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-base-content">Edit Board Member: {data.member?.name || 'Loading...'}</h1>
         <a href="/admin?tab=tab4" class="btn btn-ghost btn-sm">
            <Icon src={ArrowUturnLeft} class="h-5 w-5" />
            Back to Admin
        </a>
    </div>

    {#if form?.error}
        <div class="alert alert-error mb-4 shadow-md"> </div>
    {/if}
    {#if form?.fieldErrors}
        <div class="alert alert-warning mb-4 shadow-md"> </div>
    {/if}

    <form method="POST" action="?/updateBoardMember" use:enhance={() => {
        isSaving = true;
        return async ({ update, result }) => {
            await update({ reset: false });
            isSaving = false;
        };
    }} enctype="multipart/form-data" class="card bg-base-200 shadow-xl">
        <div class="card-body space-y-4">
            <div class="form-control">
                <label class="label" for="editMemberNameInput"><span class="label-text">Full Name*</span></label>
                <input name="name" type="text" id="editMemberNameInput" class="input input-bordered w-full" bind:value={memberName} required />
            </div>

            <div class="form-control">
                <label class="label" for="editMemberRoleSelect"><span class="label-text">Role/Title*</span></label>
                <select name="role" id="editMemberRoleSelect" class="select select-bordered w-full" bind:value={memberRole} required>
                    {#each boardRoles as roleOption}
                        <option value={roleOption}>{roleOption}</option>
                    {/each}
                </select>
            </div>
            
            <div class="form-control items-start">
                 <label class="label cursor-pointer gap-4 py-1"> 
                    <span class="label-text">Active Member</span>
                    <input type="hidden" name="active" value={memberActive ? 'on' : 'off'} />
                    <input type="checkbox" id="editMemberActiveToggle" class="toggle toggle-primary" bind:checked={memberActive} />
                </label>
            </div>

            <div class="card-actions justify-end mt-6">
                <a href="/admin?tab=tab4" class="btn btn-ghost" disabled={isSaving}>Cancel</a>
                <button type="submit" class="btn btn-primary flex items-center gap-1.5" disabled={isSaving}>
                    {#if isSaving} <span class="loading loading-spinner loading-xs"></span> {/if}
                    <Icon src={CheckCircle} class="h-5 w-5" />
                    Update Member
                </button>
            </div>
        </div>
    </form>
</div>