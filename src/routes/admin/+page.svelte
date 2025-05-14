<script>
    import moment from 'moment';
    import { Icon, PencilSquare, Trash, CheckCircle, XCircle, PlusCircle, ArrowRightStartOnRectangle } from 'svelte-hero-icons';
    import { invalidateAll, goto, replaceState } from '$app/navigation';
    import PocketBase from 'pocketbase';

    // Client-side PocketBase instance, primarily for delete operations now, or if you need to get file URLs directly on this page
    const pb_client = new PocketBase('https://pdg.pockethost.io/');

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

    // `data` prop contains { user (from layout), events, courses, etc. (from this page's server.js load) }
    // `form` prop is no longer used here since login/logout actions are on other routes.
    let { data } = $props();

    // Alert messages for operations like delete, or from redirects
    let successAlertMessage = $state('');
    let errorAlertMessage = $state('');

    function clearAlerts() {
        successAlertMessage = '';
        errorAlertMessage = '';
    }
    
    // Effect to check for query params (e.g., after successful creation/update and redirect)
    $effect(() => {
    const url = new URL(window.location.href); // Use URL API for easier param handling
    const createdType = url.searchParams.get('created');
    const updatedType = url.searchParams.get('updated');
    const deletedType = url.searchParams.get('deleted');

    let messageSet = false;

    if (createdType) {
        successAlertMessage = `${createdType.charAt(0).toUpperCase() + createdType.slice(1)} created successfully!`;
        messageSet = true;
    }
    if (updatedType) {
        successAlertMessage = `${updatedType.charAt(0).toUpperCase() + updatedType.slice(1)} updated successfully!`;
        messageSet = true;
    }
     if (deletedType) { 
        successAlertMessage = `${deletedType.charAt(0).toUpperCase() + deletedType.slice(1)} deleted successfully.`;
        messageSet = true;
    }

    if (messageSet) {
        // Remove all query parameters by setting search to empty
        url.search = ''; 
        // Use SvelteKit's replaceState
        replaceState(url, window.history.state); // Pass current history state

        setTimeout(() => clearAlerts(), 3000);
    }
});


    // --- Delete Function (remains client-side for now) ---
    async function deleteItem(collectionName, itemId, itemName, itemTypeName) {
        clearAlerts();
        if (!itemId || !window.confirm(`Are you sure you want to delete ${itemTypeName} "${itemName || 'this item'}"? This action cannot be undone.`)) {
            return;
        }
        try {
            await pb_client.collection(collectionName).delete(itemId);
            successAlertMessage = `${itemTypeName} "${itemName}" deleted successfully.`;
            await invalidateAll(); // Refresh the list data
            setTimeout(() => clearAlerts(), 3000);
        } catch (err) {
            console.error(`Failed to delete ${itemTypeName}:`, err);
            errorAlertMessage = `Error deleting ${itemTypeName}: ${err.message || 'Unknown error'}.`;
             if (err.data?.data) {
                let detailedErrors = Object.entries(err.data.data).map(([field, errorObj]) => `${field}: ${errorObj.message}`).join('; ');
                errorAlertMessage += ` Details: ${detailedErrors}`;
            }
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
                <button class="btn btn-sm btn-ghost" onclick={clearAlerts}>✕</button>
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
                 <button class="btn btn-sm btn-ghost" onclick={clearAlerts}>✕</button>
            </div>
        </div>
    {/if}
</div>

<div class="hero bg-base-200">
    <div class="hero-content py-12 text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Admin Panel</h1>
        </div>
    </div>
</div>

<div class="container mx-auto px-4 py-8">
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
            <div class="flex items-center justify-between rounded-t-lg bg-neutral p-4 text-neutral-content">
                <h2 class="text-xl font-bold">Plumas Disc Golf Admin</h2>
                <a href="/logout" class="btn btn-error btn-sm flex items-center gap-2">
                    <Icon src={ArrowRightStartOnRectangle} class="h-5 w-5"></Icon>
                    Logout
                </a>
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
                    <a href="/admin/events/new" class="btn btn-secondary btn-sm flex items-center gap-2">
                        <Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Event
                    </a>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead><tr><th>Name</th><th>Date</th><th>Type</th><th>Published</th><th>Actions</th></tr></thead>
                        <tbody>
                            {#if data.events && data.events.length > 0}
                                {#each data.events as event (event.id)}
                                    <tr>
                                        <td>{event.name}</td>
                                        <td>{moment(event.startDateTime).format('MMM Do, YY h:mm A')}</td>
                                        <td>{event.eventType}</td>
                                        <td>{event.published ? 'Yes' : 'No'}</td>
                                        <td class="flex gap-2">
                                            <a href="/admin/events/edit/{event.id}" title="Edit Event" class="btn btn-info btn-sm btn-square">
                                                <Icon src={PencilSquare} class="h-4 w-4"></Icon>
                                            </a>
                                            <button title="Delete Event" class="btn btn-error btn-sm btn-square" onclick={() => deleteItem('events', event.id, event.name, 'Event')}>
                                                <Icon src={Trash} class="h-4 w-4"></Icon>
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            {:else}<tr><td colspan="5" class="text-center p-4">No events found.</td></tr>{/if}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="p-4 {activeTabId === tabs[1].id ? '' : 'hidden'}">
                <div class="mb-4 flex justify-end">
                     <a href="/admin/courses/new" class="btn btn-secondary btn-sm flex items-center gap-2">
                        <Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Course
                    </a>
                </div>
                <div class="overflow-x-auto">
                     <table class="table table-zebra w-full">
                        <thead><tr><th>Name</th><th>Holes</th><th>Par</th><th>Location</th><th>Actions</th></tr></thead>
                        <tbody>
                            {#if data.courses && data.courses.length > 0}
                                {#each data.courses as course (course.id)}
                                <tr>
                                    <td>{course.name}</td><td>{course.numberOfHoles}</td><td>{course.par}</td><td>{course.location}</td>
                                    <td class="flex gap-2">
                                        <a href="/admin/courses/edit/{course.id}" title="Edit Course" class="btn btn-info btn-sm btn-square">
                                            <Icon src={PencilSquare} class="h-4 w-4"></Icon>
                                        </a>
                                        <button title="Delete Course" class="btn btn-error btn-sm btn-square" onclick={() => deleteItem('courses', course.id, course.name, 'Course')}>
                                            <Icon src={Trash} class="h-4 w-4"></Icon>
                                        </button>
                                    </td>
                                </tr>
                                {/each}
                            {:else}<tr><td colspan="5" class="text-center p-4">No courses found.</td></tr>{/if}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="p-4 {activeTabId === tabs[2].id ? '' : 'hidden'}">
                 <div class="mb-4 flex justify-end">
                    <a href="/admin/posts/new" class="btn btn-secondary btn-sm flex items-center gap-2">
                        <Icon src={PlusCircle} class="h-6 w-6"></Icon>Add New Post
                    </a>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead><tr><th>Title</th><th>Date</th><th>Categories</th><th>Published</th><th>Actions</th></tr></thead>
                        <tbody>
                             {#if data.posts && data.posts.length > 0}
                                {#each data.posts as post (post.id)}
                                <tr>
                                    <td>{post.title}</td>
                                    <td>{moment(post.publishedDate).format('MMM Do, YY')}</td>
                                    <td>{Array.isArray(post.categories) ? post.categories.join(', ') : post.categories}</td>
                                    <td>{post.published ? 'Yes' : 'No'}</td>
                                    <td class="flex gap-2">
                                        <a href="/admin/posts/edit/{post.id}" title="Edit Post" class="btn btn-info btn-sm btn-square">
                                            <Icon src={PencilSquare} class="h-4 w-4"></Icon>
                                        </a>
                                        <button title="Delete Post" class="btn btn-error btn-sm btn-square" onclick={() => deleteItem('posts', post.id, post.title, 'Post')}>
                                            <Icon src={Trash} class="h-4 w-4"></Icon>
                                        </button>
                                    </td>
                                </tr>
                                {/each}
                            {:else}<tr><td colspan="5" class="text-center p-4">No posts found.</td></tr>{/if}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="p-4 {activeTabId === tabs[3].id ? '' : 'hidden'}">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div> <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold">Board Members</h3>
                            <a href="/admin/board/members/new" class="btn btn-secondary btn-xs flex items-center gap-1"> <Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Member
                            </a>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra table-sm w-full">
                                <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {#if data.boardMembers && data.boardMembers.length > 0}
                                        {#each data.boardMembers as member (member.id)}
                                        <tr>
                                            <td>{member.name}</td><td>{member.role}</td>
                                            <td><div class="badge {member.active ? 'badge-success' : 'badge-ghost'} badge-sm">{member.active ? 'Active' : 'Inactive'}</div></td>
                                            <td class="flex gap-1">
                                                <a href="/admin/board/members/edit/{member.id}" title="Edit Member" class="btn btn-info btn-xs btn-square"> <Icon src={PencilSquare} class="h-3 w-3"></Icon>
                                                </a>
                                                <button title="Delete Member" class="btn btn-error btn-xs btn-square" onclick={() => deleteItem('boardMembers', member.id, member.name, 'Board Member')}>
                                                    <Icon src={Trash} class="h-3 w-3"></Icon>
                                                </button>
                                            </td>
                                        </tr>
                                        {/each}
                                    {:else}<tr><td colspan="4" class="text-center p-4">No board members.</td></tr>{/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div> <div class="flex justify-between items-center mb-2">
                            <h3 class="text-lg font-semibold">Board Meetings</h3>
                             <a href="/admin/board/meetings/new" class="btn btn-secondary btn-xs flex items-center gap-1"> <Icon src={PlusCircle} class="h-4 w-4"></Icon> Add Meeting
                            </a>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra table-sm w-full">
                                <thead><tr><th>Date</th><th>Docs</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {#if data.boardMeetings && data.boardMeetings.length > 0}
                                        {#each data.boardMeetings as meeting (meeting.id)}
                                        <tr>
                                            <td>{moment(meeting.meetingDateTime).format('MMM Do, YYYY')}</td>
                                            <td>
                                                {#if meeting.agendaLink}<a href={meeting.agendaLink} target="_blank" rel="noopener noreferrer" class="link link-info link-hover text-xs">Agenda</a>{/if}
                                                {#if meeting.minutesLink}<a href={meeting.minutesLink} target="_blank" rel="noopener noreferrer" class="link link-info link-hover text-xs ml-2">Minutes</a>{/if}
                                            </td>
                                            <td class="flex gap-1">
                                                <a href="/admin/board/meetings/edit/{meeting.id}" title="Edit Meeting" class="btn btn-info btn-xs btn-square"> <Icon src={PencilSquare} class="h-3 w-3"></Icon>
                                                </a>
                                                <button title="Delete Meeting" class="btn btn-error btn-xs btn-square" onclick={() => deleteItem('boardMeetings', meeting.id, moment(meeting.meetingDateTime).format('MMM Do, YY'), 'Board Meeting')}>
                                                    <Icon src={Trash} class="h-3 w-3"></Icon>
                                                </button>
                                            </td>
                                        </tr>
                                        {/each}
                                    {:else}<tr><td colspan="3" class="text-center p-4">No board meetings.</td></tr>{/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>