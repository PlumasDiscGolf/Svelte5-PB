<script>
	/** @type {import('../event/$types').PageData} */
	import * as config from '$lib/config';

	let { data } = $props();

	let event = data.event;

</script>

<svelte:head>
	<title>{event.name} - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">{event.name}</h1>
		</div>
	</div>
</div>

<!-- Event Details -->
<div class="container mx-auto px-4 py-8">
	<div class="grid gap-8 rounded-2xl bg-base-100 shadow-xl md:grid-cols-2">
		<!-- Event Image -->
		<figure class="w-full">
			<img src={event.imageURL} alt={event.name} class="my-auto w-full rounded-2xl" />
		</figure>

		<!-- Event Details -->
		<div class="w-full">
			<!-- Date and Location Info -->
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
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
					<span>
						{event.startDate}
						{#if event.startDate != event.endDate}
							through {event.endDate}
						{/if}
					</span>
				</div>

				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span>{event.location}</span>
				</div>
			</div>

			<!-- Description -->
			<div class="prose mt-4">
				<p class="text-base-content/70">{@html event.description}</p>
			</div>
		</div>
		<!-- Event Links -->
		<div class="my-2 flex flex-wrap justify-center gap-2 md:col-span-2">
			{#if event.registrationURL}
				<a href={event.registrationURL} class="btn btn-primary" target="_blank">
					Registration Page
				</a>
			{/if}

			{#if event.pdgaURL}
				<a href={event.pdgaURL} class="btn btn-secondary" target="_blank"> PDGA Event Page </a>
			{/if}

			{#if event.discGolfSceneURL}
				<a href={event.discGolfSceneURL} class="btn btn-accent" target="_blank">
					Disc Golf Scene Page
				</a>
			{/if}

			{#if event.eventInfoURL}
				<a href={event.eventInfoURL} class="btn btn-info" target="_blank"> Event Information </a>
			{/if}

			{#if event.resultsURL}
				<a href={event.resultsURL} class="btn btn-warning" target="_blank"> Results Page </a>
			{/if}
		</div>
	</div>
</div>
