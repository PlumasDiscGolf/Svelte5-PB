<script>
	/** @type {import('../event/$types').PageData} */
	import * as config from '$lib/config';
	import { formatDate } from '$lib/utils';

	let { data } = $props();

	let event = data.event;

</script>

<svelte:head>
	<title>{event.name} - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero min-h-[40vh] relative" style="">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-xl">
      <div class="flex justify-center gap-2 mb-4">
        
        {#if event.registrationRequired}
          <div class="badge badge-secondary">Registration Required</div>
        {/if}
      </div>
      <h1 class="mb-5 text-5xl font-bold">{event.name}</h1>
    </div>
  </div>
</div>

<div class="container mx-auto px-4 py-8">
  <!-- Quick Info Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <!-- Date/Time Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="card-title">When</h3>
        </div>
        <div class="space-y-1">
          <p>{event.startDate}</p>
          {#if event.startDate != event.endDate}
            <p>through</p>
            <p>{event.endDate}</p>
          {/if}
          <p class="text-base-content/70">Starting at {event.checkInTime}</p>
        </div>
      </div>
    </div>

    <!-- Location & Type Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 class="card-title">Where</h3>
        </div>
        <p>{event.location}</p>
		<div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 class="card-title">Event Type</h3>
        </div>
        <p>{event.type}</p>

      </div>
    </div>

    <!-- Registration Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 class="card-title">Registration</h3>
        </div>
        <div class="space-y-2">
          <p>{event.registrationRequired ? 'Registration required' : 'No registration needed'}</p>
          {#if event.cost}
            <p class="text-lg font-semibold">${event.cost}</p>
          {/if}
          {#if event.registrationDeadline}
            <p class="text-sm text-base-content/70">
              Register by {formatDate(event.registrationDeadline)}
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Event Description -->
  <div class="card bg-base-100 shadow-xl mb-8">
    <div class="card-body prose max-w-none">
      <h2 class="card-title">Event Details</h2>
      {@html event.description}
    </div>
  </div>

  <!-- External Links -->
  <div class="flex flex-wrap gap-2 justify-center">
    {#if event.registrationURL}
      <a href={event.registrationURL} class="btn btn-primary" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Register Now
      </a>
    {/if}

    {#if event.pdgaURL}
      <a href={event.pdgaURL} class="btn btn-secondary" target="_blank">
        PDGA Event Page
      </a>
    {/if}

    {#if event.discGolfSceneURL}
      <a href={event.discGolfSceneURL} class="btn btn-accent" target="_blank">
        Disc Golf Scene
      </a>
    {/if}

    {#if event.eventInfoURL}
      <a href={event.eventInfoURL} class="btn" target="_blank">
        Additional Information
      </a>
    {/if}

    {#if event.resultsURL}
      <a href={event.resultsURL} class="btn" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        View Results
      </a>
    {/if}
  </div>
</div>