<script>
	/** @type {import('./$types').PageData} */
	let { data } = $props();
	const activeMembers = data.board_members.active;
	const inactiveMembers = data.board_members.inactive;
	const meetings = data.meetings;
</script>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Board of Directors</h1>
		</div>
	</div>
</div>


<div class="mt-8 w-full">
	<h2 class="my-2 text-center text-3xl">Current Members</h2>
	<!-- active members List -->
	<div class="container mx-auto px-4 py-8">
		<!-- member Card -->
		{#each activeMembers as member}
			<div class="card mb-8 bg-base-200 shadow-xl lg:card-side">
				<figure class="lg:w-1/3">
					<img src={member.imageURL} alt="member banner" class="h-full w-full object-cover" />
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
	<h2 class="mt-4 text-center text-3xl">Former Members</h2>
	<!-- active members List -->
	<div class="container mx-auto px-4 py-8">
		<!-- member Card -->
		{#each inactiveMembers as member}
			<div class="card mb-8 bg-neutral text-neutral-content shadow-xl lg:card-side">
				<div class="card-body lg:w-2/3">
					<h2 class="card-title text-2xl">{member.name}</h2>

					<p>{@html member.bio}</p>
				</div>
			</div>
		{/each}
	</div>
	<h2 class="text-center text-2xl">Board Meeting Documents</h2>
	<div class="mx-32 mt-6 overflow-x-auto">
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
				{#each meetings as meeting}
					<tr class="hover">
						<th>{meeting.date}</th>
						<td
							><a href={meeting.agenda} target="_blank" class="btn btn-primary btn-sm">Agenda</a
							></td
						>
						{#if !meeting.minutes}
							<td>-</td>
						{:else}
							<td
								><a href={meeting.minutes} target="_blank" class="btn btn-secondary btn-sm"
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
