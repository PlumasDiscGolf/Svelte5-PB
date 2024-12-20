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
			<h1 class="text-5xl font-bold">Board</h1>
		</div>
	</div>
</div>
<div class="mt-8 w-full">
	<h2 class="my-2 text-center text-2xl">Current Members</h2>

	<div class="grid w-full gap-2 md:grid-cols-2 md:gap-4">
		{#each activeMembers as member}
			<div
				class="card card-side border-4 border-slate-800 bg-primary p-6 text-secondary-content shadow-xl"
			>
				<figure class="min-w-fit">
					<img src={member.image_url} alt="" class="w-48 rounded-3xl" />
				</figure>
				<div class="card-body">
					<h3 class="card-title text-2xl">{member.role}</h3>
					<h4 class="text-lg font-semibold">{member.name}</h4>
					<p>{member.bio}</p>
				</div>
			</div>
		{/each}
	</div>
	<h2 class="mt-4 text-center text-2xl">Former Members</h2>
	<div class="grid w-full gap-4 px-8 py-4">
		{#each inactiveMembers as member}
			<div
				class="card mx-24 border-4 border-slate-800 bg-neutral p-6 text-neutral-content shadow-xl"
			>
				<div class="card-body">
					<h4 class="text-lg font-semibold">{member.name}</h4>
					<p>{member.bio}</p>
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
								><a href={meeting.minutes} target="_blank" class="btn btn-secondary btn-sm">Minutes</a
								></td
							>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

