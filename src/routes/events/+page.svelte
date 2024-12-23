<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();
	console.log(data)
</script>

<svelte:head>
	<title>{config.title} - Events Page</title>
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

<!-- Events List -->
<div class="container mx-auto px-4 py-8">
	<!-- Event Card -->
	{#each data.upcomingEvents as event}
		<div class="card mb-8 bg-base-100 shadow-xl lg:card-side">
			<figure class="lg:w-1/3">
				<img src={event.imageURL} alt="Event banner" class="h-full w-full object-cover" />
			</figure>
			<div class="card-body lg:w-2/3">
				<div class="flex flex-wrap gap-2">
					<div class="badge badge-secondary uppercase">{event.type}</div>
				</div>
				<h2 class="card-title text-2xl">{event.name}</h2>
				<div class="flex items-center gap-2 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>{formatDate(event.startDate)}</span>
					<span class="mx-2">•</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{event.checkInTime}</span>
				</div>
				<p>{@html event.description.substring(0,450)} ...</p>
				<div class="card-actions items-center justify-between">
					<button class="btn btn-info">More Info</button>
					<button class="btn btn-primary">Register Now</button>
					{#if event.resultsURL }
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

<!-- Events List -->
<div class="container mx-auto px-4 py-8">
	<!-- Event Card -->
	{#each data.pastEvents as event}
		<div class="card mb-8 bg-base-100 shadow-xl lg:card-side">
			<figure class="lg:w-1/3">
				<img src={event.imageURL} alt="Event banner" class="h-full w-full object-cover" />
			</figure>
			<div class="card-body lg:w-2/3">
				<div class="flex flex-wrap gap-2">
					<div class="badge badge-secondary uppercase">{event.type}</div>
				</div>
				<h2 class="card-title text-2xl">{event.name}</h2>
				<div class="flex items-center gap-2 text-sm prose">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>{formatDate(event.startDate)}</span>
					<span class="mx-2">•</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{event.checkInTime}</span>
				</div>
				<p>{@html event.description.substring(0,450)} ...</p>
				<div class="card-actions items-center justify-between">
					<button class="btn btn-info">More Info</button>
					<button class="btn btn-primary">Register Now</button>
					{#if event.resultsPosted === true}
						<button class="btn btn-warning">Results</button>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
