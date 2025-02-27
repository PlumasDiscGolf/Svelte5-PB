<script>
	/** @type {import('./$types').PageData} */
	import moment from 'moment';
	import * as config from '$lib/config';
	let { data } = $props();

</script>

<svelte:head>
	<title>{config.title} - Board Page</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Board of Directors</h1>
		</div>
	</div>
</div>


<div class="mt-8 w-full">
	<h2 class="mb-6 text-center text-3xl font-bold">Current Members</h2>
	<!-- active members List -->
	<div class="container mx-auto px-4 py-8">
		<!-- member Card -->
		{#each data.activeMembers as member}
			<div class="card mb-8 bg-base-200 shadow-xl lg:card-side">
				<figure class="lg:w-1/3">
					<img src="http://pdg.pockethost.io/api/files/{member.collectionId}/{member.id}/{member.image}?download=1}" alt="member banner" class="h-full w-full object-cover" />
				</figure>
				<div class="card-body lg:w-2/3">
					<div class="flex flex-wrap gap-2">
						<div class="badge badge-neutral uppercase">{member.role}</div>
					</div>
					<h2 class="card-title text-2xl">{member.name}</h2>

					<p>{@html member.bio}</p>
				</div>
			</div>
		{/each}
	</div>
	<h2 class="mb-6 text-center text-3xl font-bold">Former Members</h2>
	<!-- active members List -->
	<div class="container mx-auto px-4 py-8">
		<!-- member Card -->
		{#each data.inactiveMembers as member}
			<div class="card mb-8 bg-neutral text-neutral-content shadow-xl lg:card-side">
				<div class="card-body lg:w-2/3">
					<h2 class="card-title text-2xl">{member.name}</h2>

					<p>{@html member.bio}</p>
				</div>
			</div>
		{/each}
	</div>
	<h2 class="mb-6 text-center text-3xl font-bold">Board Meeting Documents</h2>
	<p class="text-center text-sm">Contact us for older meeting documents</p>
	<div class="md:mx-32 mt-6 overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th>Date</th>
					<th>Agenda Link</th>
					<th>Minutes Link</th>
				</tr>
			</thead>
			<tbody>
				{#each data.boardMeetings.items as meeting}
					<tr class="hover">
						<th>{moment(meeting.meetingDateTime).format('MMMM Do YYYY')}</th>
						<td
							><a href="http://pdg.pockethost.io/api/files/{meeting.collectionId}/{meeting.id}/{meeting.agendaFile}?download=1}" target="_blank" class="btn btn-primary btn-sm">Agenda</a
							></td
						>
						{#if !meeting.minutesFile}
							<td>-</td>
						{:else}
							<td
								><a href="http://pdg.pockethost.io/api/files/{meeting.collectionId}/{meeting.id}/{meeting.minutesFile}?download=1}" target="_blank" class="btn btn-secondary btn-sm"
									>Minutes</a
								></td
							>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
