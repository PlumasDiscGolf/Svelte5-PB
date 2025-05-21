<script>
	import * as config from '$lib/config';
	let data = $props();
</script>

<svelte:head>
	<title>Plumas Series Results - {config.title}</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Plumas Series Results</h1>
		</div>
	</div>
</div>

<div class="overflow-x-auto">
	<table class="table table-zebra table-pin-rows table-pin-cols">
		<thead>
			<tr>
				<th>Place</th>
				<td>Name</td>
				<td>Points</td>
				<td>Event #1</td>
				<td>Event #2</td>
				<td>Event #3</td>
				<td>Event #4</td>
				<td>Event #5</td>
				<td>Event #6</td>
				<td>Event #7</td>
			</tr>
		</thead>
		<tbody
			><tr
				><th>1</th>
				<td>Jeremiah Bridges</td>
				<td>242</td>
				<td>57 (6th)</td>
				<td>85 (2nd)</td>
				<td>100 (1st)</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td></tr
			>
		</tbody>
	</table>
</div>
