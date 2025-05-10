<script>
    import moment from 'moment';
    import { Icon, PencilSquare, Trash, CheckCircle, XCircle, PlusCircle, ArrowRightStartOnRectangle } from 'svelte-hero-icons';
    import { invalidateAll } from '$app/navigation'; // Keep for CUD operations
    import { enhance } from '$app/forms'; // For progressive enhancement
    import PocketBase from 'pocketbase';

    // Import the preventDefault utility
    import { preventDefault } from '$lib/utils.js';

    // Client-side PocketBase instance for operations after login (like file URLs, event CUD)
    const pb_client = new PocketBase('https://pdg.pockethost.io/');

    // Define tabs data
    const tabs = [
        { id: 'tab1', label: 'Events' },
        { id: 'tab2', label: 'Courses' },
        { id: 'tab3', label: 'Posts' },
        { id: 'tab4', label: 'Board' }
    ];

    let activeTabId = $state('tab1');
    const setActiveTab = (tabId) => {
        activeTabId = tabId;
    };

    // `data` contains { user (from layout), events, courses, etc. (from page.server.js) }
    // `form` contains feedback from server actions (e.g., errors, success markers)
    let { data, form } = $props();

    // --- Client-side debugging for data.user ---
    $effect(() => {
        console.log('[ADMIN PAGE EFFECT] data.user updated:', data?.user ? { id: data.user.id, email: data.user.email } : 'null or undefined');
        if (data?.user && form?.loginError) {
            // If user is now defined, but form still shows a login error from a previous attempt,
            // it might be good to clear form.loginError visually, though the form itself will be hidden.
            // SvelteKit's `form` prop is reset on navigation or successful action.
        }
    });
    // --- End Debugging ---

    // Login Form State
    let loginEmail = $state(form?.email || ''); // Pre-fill email if action failed and returned it
    let loginPassword = $state('');
    let loginInProgress = $state(false);
    // `form.loginError` will be used directly in the template for login-specific errors

    // --- Modal & Form State (for Events) ---
    let eventModalElement;
    let currentEditingEventId = $state(null);
    let eventName = $state('');
    let eventType = $state('League');
    let eventStartDateTime = $state('');
    let eventEndDateTime = $state('');
    let eventDescription = $state('');
    let eventPublished = $state(true);
    let eventImageFile = $state(null);
    let existingEventImageUrl = $state('');

    // Alert messages (for non-form specific feedback like CUD success)
    let successAlertMessage = $state('');
    let errorAlertMessage = $state('');

    $effect(() => {
        if (form?.success && data?.action?.endsWith('?/logout')) {
            successAlertMessage = 'Logout successful!';
            loginEmail = ''; // Clear if prefilled
            loginPassword = '';
            setTimeout(() => successAlertMessage = '', 3000);
        }
        // Login success is primarily indicated by `data.user` becoming populated, leading to UI change.
    });

    function formatPocketBaseDateToLocalInput(pbDateTime) {
        if (!pbDateTime) return '';
        return moment(pbDateTime).format('YYYY-MM-DDTHH:mm');
    }

    function openAddEventModal() {
        currentEditingEventId = null;
        eventName = '';
        eventType = 'League';
        eventStartDateTime = '';
        eventEndDateTime = '';
        eventDescription = '';
        eventPublished = true;
        eventImageFile = null;
        existingEventImageUrl = '';
        successAlertMessage = ''; // Clear general messages
        errorAlertMessage = '';

        if (eventModalElement) {
            eventModalElement.showModal();
        } else {
            console.error("Event Modal element not found. Check 'bind:this'.");
        }
    }

    async function openEditEventModal(eventToEdit) {
        if (!eventToEdit) return;
        currentEditingEventId = eventToEdit.id;
        eventName = eventToEdit.name || '';
        eventType = eventToEdit.eventType || 'League';
        eventStartDateTime = formatPocketBaseDateToLocalInput(eventToEdit.startDateTime);
        eventEndDateTime = formatPocketBaseDateToLocalInput(eventToEdit.endDateTime);
        eventDescription = eventToEdit.description || '';
        eventPublished = eventToEdit.published === undefined ? true : eventToEdit.published;
        eventImageFile = null;
        if (eventToEdit.eventImage && eventToEdit.id && eventToEdit.collectionId) {
            existingEventImageUrl = pb_client.files.getUrl(eventToEdit, eventToEdit.eventImage, {'thumb': '100x100'});
        } else {
            existingEventImageUrl = '';
        }
        successAlertMessage = ''; errorAlertMessage = '';
        if (eventModalElement) eventModalElement.showModal();
        else console.error("Event Modal element not found.");
    }

    async function handleSaveEvent() {
        successAlertMessage = ''; errorAlertMessage = '';
        if (!eventName.trim()) { errorAlertMessage = 'Event Name is required.'; return; }
        if (!eventStartDateTime) { errorAlertMessage = 'Start Date & Time are required.'; return; }

        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('eventType', eventType);
        formData.append('description', eventDescription);
        formData.append('published', eventPublished);

        try {
            if (eventStartDateTime) {
                const startDateObj = new Date(eventStartDateTime);
                if (isNaN(startDateObj.getTime())) throw new Error('Invalid Start Date input.');
                formData.append('startDateTime', startDateObj.toISOString());
            }
            if (eventEndDateTime) {
                const endDateObj = new Date(eventEndDateTime);
                if (isNaN(endDateObj.getTime())) throw new Error('Invalid End Date input.');
                formData.append('endDateTime', endDateObj.toISOString());
            }
            if (eventImageFile && eventImageFile.name) {
                formData.append('eventImage', eventImageFile);
            }

            if (currentEditingEventId) {
                await pb_client.collection('events').update(currentEditingEventId, formData);
                successAlertMessage = 'Event updated successfully!';
            } else {
                await pb_client.collection('events').create(formData);
                successAlertMessage = 'Event created successfully!';
            }
            if (eventModalElement) eventModalElement.close();
            currentEditingEventId = null;
            await invalidateAll(); // Refresh event list data
            setTimeout(() => (successAlertMessage = ''), 3000);
        } catch (err) {
            console.error('Failed to save event:', err.response || err.originalError || err);
            errorAlertMessage = `Error saving event: ${err.message || 'Unknown error'}`;
            if (err.data && err.data.data) {
                let detailedErrors = Object.entries(err.data.data).map(([field, error]) => `${field}: ${error.message}`).join('; ');
                errorAlertMessage += ` Details: ${detailedErrors}`;
            }
        }
    }

    function handleFileSelect(e) {
        if (e.target.files && e.target.files.length > 0) {
            eventImageFile = e.target.files[0];
            existingEventImageUrl = URL.createObjectURL(e.target.files[0]); 
        } else {
            eventImageFile = null;
            // If clearing selection in edit mode, you might want to revert `existingEventImageUrl`
            // to the original stored image URL if `currentEditingEventId` is set.
            // For now, it will just clear the preview if no file is selected.
        }
    }

    async function deleteEvent(eventId, eventNameStr) {
        if (!eventId) return;
        if (!window.confirm(`Are you sure you want to delete the event "${eventNameStr || 'this event'}"? This action cannot be undone.`)) {
            return;
        }
        successAlertMessage = ''; errorAlertMessage = '';
        try {
            await pb_client.collection('events').delete(eventId);
            successAlertMessage = `Event "${eventNameStr || ''}" deleted successfully.`;
            await invalidateAll(); // Refresh event list
            setTimeout(() => (successAlertMessage = ''), 3000);
        } catch (err) {
            console.error('Failed to delete event:', err);
            errorAlertMessage = `Error deleting event: ${err.message || 'Unknown error'}.`;
        }
    }
</script>

<div class="container mx-auto px-4 pt-4">
    {#if successAlertMessage}
        <div class="alert alert-success mb-4 shadow-lg">
            <div>
                <Icon src={CheckCircle} class="h-6 w-6"></Icon>
                <span>{successAlertMessage}</span>
            </div>
            <div class="flex-none">
                <button class="btn btn-sm btn-ghost" onclick={() => (successAlertMessage = '')}>✕</button>
            </div>
        </div>
    {/if}
    {#if errorAlertMessage}
         <div class="alert alert-error mb-4 shadow-lg">
            <div>
                <Icon src={XCircle} class="h-6 w-6"></Icon>
                <span>{errorAlertMessage}</span>
            </div>
            <div class="flex-none">
                 <button class="btn btn-sm btn-ghost" onclick={() => (errorAlertMessage = '')}>✕</button>
            </div>
        </div>
    {/if}
</div>

{#if data.user}
    <div class="hero bg-base-200">
        <div class="hero-content py-12 text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">Admin Panel</h1>
                <p class="pt-2 text-sm text-base-content/80">Logged in as: {data.user.email}</p>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-8">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-0">
                <div class="flex items-center justify-between rounded-t-lg bg-neutral p-4 text-neutral-content">
                    <h2 class="text-xl font-bold">Plumas Disc Golf Admin</h2>
                    <form method="POST" action="?/logout" use:enhance={() => {
                        loginInProgress = true; // Use a generic loading state if needed
                        return async ({ update }) => {
                            await update();
                            loginInProgress = false;
                        };
                    }}>
                        <button type="submit" class="btn btn-error btn-sm flex items-center gap-2" disabled={loginInProgress}>
                            {#if loginInProgress && data?.action?.endsWith("?/logout")} <span class="loading loading-spinner loading-xs"></span>{/if}
                            <Icon src={ArrowRightStartOnRectangle} class="h-5 w-5"></Icon>
                            Logout
                        </button>
                    </form>
                </div>

                <div class="tabs-boxed tabs m-2 bg-base-200 p-1">
                    {#each tabs as tab}
                        <button class="tab {activeTabId === tab.id ? 'tab-active tab-lg' : 'tab-md'}" onclick={() => setActiveTab(tab.id)}>
                            {tab.label}
                        </button>
                    {/each}
                </div>

                <div class="p-4 {activeTabId === tabs[0].id ? '' : 'hidden'}">
                    <div class="mb-4 flex justify-end">
                        <button class="btn btn-secondary btn-sm flex items-center gap-2" onclick={openAddEventModal}>
                            <Icon src={PlusCircle} class="h-6 w-6"></Icon>
                            Add New Event
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="table table-zebra w-full">
                            <thead>
                                <tr><th>Name</th><th>Date</th><th>Type</th><th>Published</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {#if data.events && data.events.length > 0}
                                    {#each data.events as event (event.id)}
                                        <tr>
                                            <td>{event.name}</td>
                                            <td>{moment(event.startDateTime).format('MMM Do, YY h:mm A')}</td>
                                            <td>{event.eventType}</td>
                                            <td>{event.published ? 'Yes' : 'No'}</td>
                                            <td class="flex gap-2">
                                                <button title="Edit Event" class="btn btn-info btn-sm btn-square" onclick={() => openEditEventModal(event)}>
                                                    <Icon src={PencilSquare} class="h-4 w-4"></Icon>
                                                </button>
                                                <button title="Delete Event" class="btn btn-error btn-sm btn-square" onclick={() => deleteEvent(event.id, event.name)}>
                                                    <Icon src={Trash} class="h-4 w-4"></Icon>
                                                </button>
                                            </td>
                                        </tr>
                                    {/each}
                                {:else}
                                    <tr><td colspan="5" class="text-center p-4">No events found.</td></tr>
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="p-4 {activeTabId === tabs[1].id ? '' : 'hidden'}"> <p>Courses management will go here...</p> </div>
                <div class="p-4 {activeTabId === tabs[2].id ? '' : 'hidden'}"> <p>Posts management will go here...</p> </div>
                <div class="p-4 {activeTabId === tabs[3].id ? '' : 'hidden'}"> <p>Board management will go here...</p> </div>

            </div>
        </div>
    </div>

{:else}
    <div class="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
            <div class="card-body">
                <h1 class="text-3xl font-bold text-center mb-6 text-base-content">Admin Login</h1>
                {#if form?.loginError}
                    <div class="alert alert-error mb-4 text-sm p-3 shadow-lg">
                        <div>
                            <Icon src={XCircle} class="h-5 w-5"></Icon>
                            <span>{form.loginError}</span>
                        </div>
                        <div class="flex-none">
                            <button class="btn btn-xs btn-ghost" onclick={() => {form.loginError = null; /* This won't clear reactive prop directly, more for local state if used */ }}>✕</button>
                        </div>
                    </div>
                {/if}
                <form method="POST" action="?/login" use:enhance={() => {
                    loginInProgress = true;
                    return async ({ result, update }) => {
                        console.log('[ADMIN PAGE ENHANCE] Login Action result:', result);
                        await update({ reset: false }); // reset:false is key for conditional field clearing
                        loginInProgress = false;
                        
                        if (result.type === 'success' || (result.status >= 200 && result.status < 300) ) {
                           // On success, data.user will update and UI will switch
                           // Form fields are bound to $state, if they don't reset with component switch, clear them.
                           // loginEmail = ''; // These might clear if the whole form is unmounted due to {#if}
                           // loginPassword = '';
                        } else if (result.type === 'failure' || result.type === 'error') {
                            loginPassword = ''; // Always clear password on any failure
                            // email might be pre-filled if returned by action via form.email
                            if (form?.email) loginEmail = form.email;
                        }
                    };
                }} class="space-y-4">
                    <div class="form-control">
                        <label class="label" for="loginEmailInput"><span class="label-text">Email</span></label>
                        <input name="email" type="email" id="loginEmailInput" placeholder="admin@example.com" class="input input-bordered w-full" bind:value={loginEmail} required />
                    </div>
                    <div class="form-control">
                        <label class="label" for="loginPasswordInput"><span class="label-text">Password</span></label>
                        <input name="password" type="password" id="loginPasswordInput" placeholder="••••••••" class="input input-bordered w-full" bind:value={loginPassword} required />
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary w-full" disabled={loginInProgress}>
                            {#if loginInProgress}
                                <span class="loading loading-spinner loading-sm"></span>
                            {/if}
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
{/if}

{#if data.user} <dialog id="eventModal" class="modal" bind:this={eventModalElement}>
    <div class="modal-box w-11/12 max-w-2xl bg-base-100">
        <div class="flex justify-between items-center pb-3 mb-4 border-b border-base-300">
            <h3 class="text-xl font-bold text-base-content">
                {currentEditingEventId ? 'Edit Event' : 'Add New Event'}
            </h3>
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
            </form>
        </div>

        <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2"> 
            <div class="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
                <div class="form-control">
                    <label class="label" for="modalEventName"><span class="label-text">Event Name</span></label>
                    <input type="text" id="modalEventName" placeholder="e.g., Summer Flex Start" class="input input-bordered w-full" bind:value={eventName} />
                </div>
                <div class="form-control">
                    <label class="label" for="modalEventType"><span class="label-text">Event Type</span></label>
                    <select id="modalEventType" class="select select-bordered w-full" bind:value={eventType}>
                        <option>Tournament</option><option selected>League</option><option>Clinic</option><option>Work Party</option><option>Meeting</option><option>Other</option>
                    </select>
                </div>
                <div class="form-control">
                    <label class="label" for="modalEventStartDateTime"><span class="label-text">Start Date & Time</span></label>
                    <input type="datetime-local" id="modalEventStartDateTime" class="input input-bordered w-full" bind:value={eventStartDateTime} />
                </div>
                <div class="form-control">
                    <label class="label" for="modalEventEndDateTime">
                        <span class="label-text">End Date & Time</span>
                        <span class="label-text-alt">(Optional)</span>
                    </label>
                    <input type="datetime-local" id="modalEventEndDateTime" class="input input-bordered w-full" bind:value={eventEndDateTime} />
                </div>
                <div class="form-control md:col-span-2">
                    <label class="label" for="modalEventDescription"><span class="label-text">Description</span></label>
                    <textarea id="modalEventDescription" class="textarea textarea-bordered h-24 w-full" placeholder="Event details..." bind:value={eventDescription}></textarea>
                </div>
                <div class="form-control items-start md:col-span-2">
                     <label class="label cursor-pointer gap-4 py-1"> 
                        <span class="label-text">Published</span>
                        <input type="checkbox" id="modalEventPublished" class="toggle toggle-primary" bind:checked={eventPublished} />
                    </label>
                </div>
                <div class="form-control md:col-span-2">
                    <label class="label" for="modalEventImage"><span class="label-text">Event Image</span><span class="label-text-alt">(Optional)</span></label>
                    {#if currentEditingEventId && existingEventImageUrl && !eventImageFile}
                        <div class="mb-2"><img src={existingEventImageUrl} alt="Current image" class="max-h-24 rounded border"/></div>
                    {:else if eventImageFile && existingEventImageUrl}
                         <div class="mb-2"><img src={existingEventImageUrl} alt="New preview" class="max-h-24 rounded border"/></div>
                    {/if}
                    <input type="file" id="modalEventImage" class="file-input file-input-bordered file-input-sm w-full" onchange={handleFileSelect} accept="image/*" />
                </div>
            </div>
        </div>

        <div class="modal-action mt-6 pt-4 border-t border-base-300"> 
            <form method="dialog"><button class="btn btn-ghost">Cancel</button></form>
            <button class="btn btn-primary flex items-center gap-1.5" onclick={handleSaveEvent}>
                <Icon src={CheckCircle} class="h-5 w-5" />
                {currentEditingEventId ? 'Update Event' : 'Save Event'}
            </button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
{/if}