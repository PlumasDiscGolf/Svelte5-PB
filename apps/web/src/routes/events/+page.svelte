<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';
	import { Icon, Clock, Calendar } from 'svelte-hero-icons';

	let { data } = $props();
</script>

<svelte:head>
	<title>Events Page - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Upcoming Events</h1>
			{#if data.upcomingEvents.length === 0}
				<p class="mt-4 text-xl">There are no upcoming events announced at this time.</p>
			{/if}
		</div>
	</div>
</div>

<!-- Upcoming Events List -->
<div class="container mx-auto px-4 py-8">
	<!-- Event Card -->
	{#each data.upcomingEvents as event}
		<div
			class="card bg-base-100 lg:card-side mb-8 border border-gray-400 shadow-lg shadow-gray-400"
		>
			<figure class="lg:w-1/3">
				{#if event.eventImage}
					<img
						src="http://localhost:8090/api/files/{event.collectionId}/{event.id}/{event.eventImage}?download=1}"
						alt="Event banner"
						class="h-full w-full object-cover"
					/>
				{/if}
			</figure>
			<div class="card-body lg:w-2/3">
				<div class="flex flex-wrap gap-2">
					{#if event.type}
						<div class="badge badge-secondary uppercase">{event.type}</div>
					{/if}
				</div>
				<h2 class="card-title text-2xl">{event.name}</h2>
				<div class="prose flex items-center gap-2 text-sm">
					<Icon src={Calendar} class="size-5" />
					{#if formatDate(event.startDateTime) == formatDate(event.endDateTime) || !event.endDateTime}
						<span>{formatDate(event.startDateTime)}</span>
					{:else}
						<span>{formatDate(event.startDateTime)}</span>
						<span class="mx-1">-</span>
						<span>{formatDate(event.endDateTime)}</span>
					{/if}
				</div>
				<p>{@html event.description.substring(0, 450)} ...</p>
				<div class="card-actions mt-4 items-center justify-between">
					<a href="/events/{event.id}" class="btn btn-info">More Info</a>
					{#if event.registratinURL}
						<button class="btn btn-primary">Register Now</button>
					{/if}
					{#if event.resultsPosted === true}
						<button class="btn btn-warning">Results</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Past Events</h1>
		</div>
	</div>
</div>

<!-- Past Events List -->
<div class="container mx-auto px-4 py-8">
	<!-- Event Card -->
	{#each data.pastEvents as event}
		<div
			class="card bg-base-100 lg:card-side mb-8 border border-gray-400 shadow-lg shadow-gray-400"
		>
			<figure class="lg:w-1/3">
				{#if event.eventImage}
					<img
						src="http://localhost:8090/api/files/{event.collectionId}/{event.id}/{event.eventImage}?download=1}"
						alt="Event banner"
						class="h-full w-full object-cover"
					/>
				{/if}
			</figure>
			<div class="card-body lg:w-2/3">
				<div class="flex flex-wrap gap-2">
					{#if event.type}
						<div class="badge badge-secondary uppercase">{event.type}</div>
					{/if}
				</div>
				<h2 class="card-title text-2xl">{event.name}</h2>
				<div class="prose flex items-center gap-2 text-sm">
					<Icon src={Calendar} class="size-5" />
					{#if formatDate(event.startDateTime) == formatDate(event.endDateTime) || !event.endDateTime}
						<span>{formatDate(event.startDateTime)}</span>
					{:else}
						<span>{formatDate(event.startDateTime)}</span>
						<span class="mx-1">-</span>
						<span>{formatDate(event.endDateTime)}</span>
					{/if}
				</div>
				<p>{@html event.description.substring(0, 450)} ...</p>
				<div class="card-actions mt-4 items-center justify-between">
					<a href="/events/{event.id}" class="btn btn-info">More Info</a>
					<button class="btn btn-primary">Register Now</button>
					{#if event.resultsPosted === true}
						<button class="btn btn-warning">Results</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
