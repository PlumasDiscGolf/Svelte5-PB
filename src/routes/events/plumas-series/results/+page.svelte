<script>
	import * as config from '$lib/config';
	import { standings } from './standings.js'; //
</script>

<svelte:head>
	<title>Plumas Series Results - {config.title}</title>
</svelte:head>

<div class="hero bg-base-200"><div class="hero-content py-12 text-center"><div class="max-w-md"><h1 class="text-5xl font-bold">Plumas Series Results</h1></div></div></div>

<div class="container mx-auto p-4">
	<div class="hidden gap-px overflow-hidden rounded-t-lg bg-primary text-primary-content md:grid md:grid-cols-11">
		<div class="p-3 font-semibold">Place</div>
		<div class="p-3 text-left font-semibold md:col-span-2">Name</div>
		<div class="p-3 text-center font-semibold">Total Points</div>
		<div class="p-3 text-center font-semibold">Event #1</div>
		<div class="p-3 text-center font-semibold">Event #2</div>
		<div class="p-3 text-center font-semibold">Event #3</div>
		<div class="p-3 text-center font-semibold">Event #4</div>
		<div class="p-3 text-center font-semibold">Event #5</div>
		<div class="p-3 text-center font-semibold">Event #6</div>
		<div class="p-3 text-center font-semibold">Event #7</div>
	</div>

	<div class="overflow-hidden rounded-b-lg border border-base-300 md:rounded-t-none md:border-t-0">
		{#each standings as playerEntry, i}
			{@const events = [playerEntry.eventOne, playerEntry.eventTwo, playerEntry.eventThree, playerEntry.eventFour, playerEntry.eventFive, playerEntry.eventSix, playerEntry.eventSeven]}
			<div
				class="grid grid-cols-2 gap-px hover:bg-base-300 md:grid-cols-11 md:gap-px
                       {i % 2 === 0 ? 'bg-base-100' : 'bg-base-200'} 
                       {i < standings.length - 1 ? 'border-b border-base-300 md:border-b-0' : ''}"
			>
				<div class="border-r border-base-300 p-3 text-right font-semibold md:hidden">Place</div>
				<div class="p-3 md:pl-6">{playerEntry.place}</div>

				<div class="border-r border-base-300 p-3 text-right font-semibold md:hidden">Name</div>
				<div class="p-3 md:col-span-2">{playerEntry.player}</div>

				<div class="border-r border-base-300 p-3 text-right font-semibold md:hidden">Total Points</div>
				<div class="p-3 md:text-center"><strong>{playerEntry.totalPoints}</strong></div>

				{#each events as eventData, eventIndex}
					<div class="border-r border-base-300 p-3 text-right font-semibold md:hidden">Event #{eventIndex + 1}</div>
					<div class="p-3 md:text-center">
						{#if eventData}
							<strong>{eventData.points}</strong> <br /> ({eventData.place})
						{:else}
							-
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>
