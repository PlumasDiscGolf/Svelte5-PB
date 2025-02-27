<script>
	/** @type {import('./$types').PageData} */
	import moment from 'moment'
	import { Icon, Calendar, MapPin, Trophy, UserPlus, CurrencyDollar } from 'svelte-hero-icons';
	import * as config from '$lib/config';
	import { formatDate, formatTime } from '$lib/utils';
	let { data } = $props();

	let event = data.event;
</script>

<svelte:head>
	<title>{event.name} - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
{#if event.bannerImage}
	<div
		class="hero relative min-h-[40vh]"
		style="background-image: url({`https://pdg.pockethost.io/api/files/${event.collectionId}/${event.id}/${event.bannerImage}?download=1`})"
	>
		<div class="hero-overlay bg-opacity-20"></div>
		<div class="hero-content text-neutral-content h-full text-center">
			<div class="h-full">
				<div class="mb-4 flex h-full w-full items-end gap-2">
					<h1 class="mb-5 text-5xl font-bold drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)]">
						{event.name}
					</h1>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="hero relative min-h-[40vh]">
		<div class="hero-overlay bg-opacity-60"></div>
		<div class="hero-content text-neutral-content text-center">
			<div class="max-w-xl">
				<h1 class="mb-5 text-5xl font-bold drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)]">
					{event.name}
				</h1>
			</div>
		</div>
	</div>
{/if}

<div class="container mx-auto px-4 py-8">
	<!-- Quick Info Cards -->
	<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
		<!-- When & Where Card -->
		<div class="card bg-base-100 shadow-lg shadow-gray-400">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<Icon src={Calendar} class="size-6" />
					<h3 class="card-title">When</h3>
				</div>
				<div class="mb-4 space-y-1">
					<p>
						{#if moment(event.startDateTime).format('MMMM Do YYYY') != moment(event.endDateTime).format('MMMM Do YYYY')}
							{moment(event.startDateTime).format('MMMM Do YYYY')} through {moment(event.endDateTime).format('MMMM Do YYYY')}
						{:else}
							{moment(event.startDateTime).format('MMMM Do YYYY, h:mm A')}
						{/if}
					</p>
					{#if event.checkInTime}
						<p class="text-base-content/70">Check-In begins at {moment(event.checkInTime).format('h:mm A')}</p>
					{/if}
				</div>
				<div class="mb-4 w-full">
					<div class="flex items-center gap-2">
						<Icon src={MapPin} class="size-6" />
						<h3 class="card-title">Where</h3>
					</div>
					<div class="text-secondary mt-2 grid grid-cols-2 font-semibold">
						{#each event.expand.location as location}
							<a href="/courses/{location.course}">{location.name}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Type Card & Fee -->
		<div class="card bg-base-100 shadow-lg shadow-gray-400">
			<div class="card-body">
				<div class="mb-4">
					<div class="mb-2 flex items-center gap-2">
						<Icon src={Trophy} class="size-6" />
						<h3 class="card-title">Event Type</h3>
					</div>
					<p>{event.eventType}</p>
				</div>
				{#if event.cost}
					<div class="flex items-center gap-2">
						<Icon src={CurrencyDollar} class="size-6" />
						<h3 class="card-title">Event Fee</h3>
					</div>
					<p class="text-lg font-semibold">{event.cost}</p>
				{/if}
			</div>
		</div>

		<!-- Registration Card -->
		<div class="card bg-base-100 shadow-lg shadow-gray-400">
			<div class="card-body">
				<div class="flex items-center gap-2">
					<Icon src={UserPlus} class="size-6" />
					<h3 class="card-title">Registration</h3>
				</div>
				<div class="space-y-2">
					<p>{event.registrationRequired ? 'Registration required' : 'No registration needed'}</p>

					{#if event.registrationRequired}
						{#if event.onlineRegistration}
							<p class="text-base-content/70 text-sm">
								Register Online
								{#if event.registrationDeadline}
									by {moment(event.registrationDeadline).format('MMMM Do YYYY')}
								{/if}
							</p>
						{/if}
						{#if event.onsiteRegistration}
							<p class="text-base-content/70 text-sm">
								Registration on-site
							</p>
						{/if}
						{#if event.lateRegistration}
							<p class="text-base-content/70 text-sm">
								Late registration on-site for extra ${event.lateFee}
							</p>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<div>
			{#if event.eventImage}
				<img
					src="https://pdg.pockethost.io/api/files/{event.collectionId}/{event.id}/{event.eventImage}?download=1}"
					alt="Event banner"
					class="w-full"
				/>
			{/if}
			<!-- External Links -->
			<div class="flex flex-wrap justify-center mt-10 gap-2">
				{#if event.registrationURL}
					<a href={event.registrationURL} class="btn btn-primary" target="_blank">
						<Icon src={UserPlus} solid class="size-5" />
						Register Now
					</a>
				{/if}

				{#if event.pdgaURL}
					<a href={event.pdgaURL} class="btn btn-secondary" target="_blank"> PDGA Event Page </a>
				{/if}

				{#if event.discGolfSceneURL}
					<a href={event.discGolfSceneURL} class="btn btn-accent" target="_blank">
						Disc Golf Scene
					</a>
				{/if}

				{#if event.eventInfoURL}
					<a href={event.eventInfoURL} class="btn" target="_blank"> Additional Information </a>
				{/if}

				{#if event.resultsURL}
					<a href={event.resultsURL} class="btn btn-warning" target="_blank"> View Results </a>
				{/if}
			</div>
		</div>
		<!-- Event Description -->
		<div class="card bg-base-100 mb-8 shadow-lg shadow-gray-400">
			<div class="card-body text-base-content leading-1 prose max-w-none">
				<h2 class="card-title text-2xl">Event Details</h2>
				{@html event.description}
			</div>
		</div>
	</div>
</div>
