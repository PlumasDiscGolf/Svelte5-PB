<script>
	/** @type {import('./$types').PageData} */
	export let data;
	const activeMembers = data.board_members.active;
	const inactiveMembers = data.board_members.inactive;
	const meetings = data.meetings;
</script>

<div class="my-4 w-full text-center">
	<h1 class="text-4xl">Board of Directors</h1>
</div>
<div class="mt-8 w-full">
	<h2 class="text-center text-2xl my-2">Current Members</h2>

	<div class="grid md:grid-cols-2 md:gap-4 w-full gap-2">
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
	<h2 class="text-center text-2xl mt-4">Former Members</h2>
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
	<div class="overflow-x-auto mt-6 mx-32">
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
					<td><a href={meeting.agenda} target="_blank"><span class="text-primary font-semibold underline">Agenda</span></a></td>
                    {#if !meeting.minutes}
                    <td>-</td>
                    {:else}
					<td><a href={meeting.minutes} target="_blank"><span class="text-secondary font-semibold underline">Minutes</span></a></td>
                    {/if}
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
