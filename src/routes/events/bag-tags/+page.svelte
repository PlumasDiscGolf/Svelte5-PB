<script>
	/** @type {import('./$types').PageData} */
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';
	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title} - Bag Tags League</title>
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-base-200">
	<div class="hero-content py-12 text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Bag Tags League</h1>
		</div>
	</div>
</div>
<div class="mt-8 grid w-full md:grid-cols-2">
	<div>
		<h2 class="mb-6 text-center text-3xl font-bold">What is a Bag Tags League?</h2>
		<div class="prose lg:prose-xl mx-auto">
			<p>Bag Tag leagues are a fun and competitive way to play disc golf! Here's the basic idea:</p>
			<p>
				<strong>Bag Tags:</strong> Each player in the league receives a numbered tag. Think of it like your ranking within the league. The lower the number on your tag, the higher your ranking.
			</p>
			<p>
				<strong>Weekly Challenge:</strong> Each week, you'll play a round (or rounds) of disc golf, and your score determines your new tag number for the following week. The better you score, the lower your tag number becomes.
			</p>
			<p>
				<strong>Challenge Matches:</strong> Outside of the regular weekly rounds, you can challenge other players for their tags. If you win the challenge match, you get their tag (and they get yours). This allows you to move up the rankings even faster.
			</p>
			<p>
				<strong>Competition and Camaraderie:</strong> Bag tag leagues are a great way to compete against other players, improve your game, and enjoy the camaraderie of the disc golf community.
			</p>
			<p>For the Plumas Disc Golf Bag Tag Leagues Comprehensive Rules, click <a href="/events/bag-tags/rules">here</a></p>
		</div>
	</div>
	<div>
		<h2 class="mb-6  mt-6 md:mt-0 text-center text-3xl font-bold">2025 League Schedule</h2>
		<div class="prose lg:prose-xl mx-auto">
			<p><strong>Season Start:</strong> Plumas Disc Golf Membership Drive, April 5th, 2025. For more info, click <a href="/events/9qsc06b3jum1810">here</a>.</p>
			<p>
				<strong>Regular Season:</strong> Following the Membership Drive, leagues will follow the regular schedule.
			</p>
			<ul>
				<li><strong>Ladies League:</strong> Mondays at 5:30 PM</li>
				<li><strong>Open League:</strong> Wednesdays at 5:30 PM</li>
			</ul>

			<p>
				<strong>Season End:</strong>
			</p>
			<ul>
				<li><strong>Ladies League:</strong> September 15th, 2025</li>
				<li><strong>Open League:</strong> September 17th, 2025</li>
			</ul>
			<p>
				<strong>Location:</strong> Pioneer Disc Golf Course.
			</p>
			<p>
				<strong>Course Closures (No League Play):</strong>
			</p>
			<ul>
				<li>June 29th - July 11th (High Sierra Music Festival - Dates Subject to Change)</li>
				<li>July 24th - July 28th (Plumas-Sierra County Fair - Dates Subject to Change)</li>
				<li>Any other dates the course is closed to the public.</li>
			</ul>
		</div>
	</div>
</div>

