<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="my-4 w-full text-center">
	<h1 class="text-4xl">Upcoming Events</h1>
	{#if data.upcomingEvents.length === 0}
		<h2 class="mt-4 text-xl">There are no upcoming events announced at this time.</h2>
	{/if}
</div>

<div class="grid w-full gap-4 p-6 text-primary-content md:grid-cols-2">
	{#each data.upcomingEvents as event}
		<div
			class="card card-side border-4 border-slate-800 bg-primary p-6 text-primary-content shadow-xl"
		>
			<figure class="min-w-fit">
				<img src={event.imageURL} alt="" class="w-48 rounded-2xl" />
			</figure>
			<div class="card-body">
				<h3 class="card-title text-2xl text-primary-content">{formatDate(event.startDate)}</h3>
				<h4 class="text-lg font-semibold">{event.name}</h4>
				<p>{event.description}</p>
				<a href="/events/{event.slug}" class="btn btn-secondary">Details</a>
				{#if event.resultsPosted === true}
					<a href="/events/{event.slug}/info" class="btn btn-warning">Results</a>
				{/if}
			</div>
		</div>
	{/each}
</div>

<div class="my-4 w-full text-center">
	<h1 class="text-4xl">Past Events</h1>
</div>

<div class="grid w-full gap-4 p-6 text-primary-content md:grid-cols-2">
	{#each data.pastEvents as event}
		<div
			class="card card-side border-4 border-slate-800 bg-primary p-6 text-primary-content shadow-xl"
		>
			<figure class="min-w-fit">
				<img src={event.imageURL} alt="" class="w-48 rounded-2xl" />
			</figure>
			<div class="card-body h-full">
				<p class="card-title text-center text-2xl mx-auto">{event.name}</p>
				<p class="mx-auto text-center font-semibold text-primary-content">
					{formatDate(event.startDate)}
				</p>
				<p class="">{@html event.shortDescription}</p>
				<a href="/events/{event.slug}" class="btn btn-secondary">Details</a>
				{#if event.resultsPosted === true}
					<a href="/events/{event.slug}/results" class="btn btn-warning">Results</a>
				{/if}
			</div>
		</div>
	{/each}
</div>
