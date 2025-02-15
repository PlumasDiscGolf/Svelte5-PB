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

<div class="mt-8 w-full">
	<h2 class="mb-6 text-center text-3xl font-bold">Comprehensive Rules</h2>
	<div class="prose lg:prose-xl">
		<p>
			These rules govern the Plumas Disc Golf Tags League (Open) and the Plumas Disc Golf Ladies
			Tags League, unless otherwise specified.
		</p>
		<ol>
			<li>
				<strong>Membership</strong>
				<ol>
					<li>
						All participants must be current 2025 Plumas Disc Golf members. Membership fee is
						$25.
					</li>
				</ol>
			</li>
            <li>
                <strong>League Schedule</strong>
            </li>
		</ol>
		<ul></ul>

		<h2>2.0 League Schedule</h2>
		<ul>
			<li>
				2.1 <strong>Season Start:</strong> April 5th, 2025 (Membership Drive and initial tag distribution)
			</li>
			<li>
				2.2 <strong>Regular Season:</strong> Following the Membership Drive, leagues will follow the
				regular schedule.
			</li>
			<li>2.3 <strong>Ladies League:</strong> Mondays at 5:30 PM</li>
			<li>2.4 <strong>Open League:</strong> Wednesdays at 5:30 PM</li>
			<li>2.5 <strong>Location:</strong> Pioneer Disc Golf Course</li>
			<li>
				2.6 <strong>Season End:</strong>
				<ul>
					<li>2.6.1 Ladies League: September 15th, 2025</li>
					<li>2.6.2 Open League: September 17th, 2025</li>
				</ul>
			</li>
			<li>
				2.7 <strong>Course Closures (No League Play):</strong>
				<ul>
					<li>
						2.7.1 June 29th - July 11th (High Sierra Music Festival - Dates Subject to Change)
					</li>
					<li>2.7.2 July 24th - July 28th (Plumas-Sierra County Fair - Dates Subject to Change)</li>
					<li>2.7.3 Any other dates the course is closed to the public.</li>
				</ul>
			</li>
		</ul>

		<h2>3.0 Bag Tags</h2>
		<ul>
			<li>
				3.1 <strong>Initial Distribution:</strong> Tags will be initially assigned based on placement
				in the Membership Drive event on April 5th, 2025.
			</li>
			<li>
				3.2 <strong>Weekly Distribution:</strong> At the start of each regular league event, all participants
				will turn in their tags. Tags will then be redistributed based on the results of that day's two
				9-hole rounds. Lowest scores receive the lowest tag numbers.
			</li>
			<li>
				3.3 <strong>Tag Order:</strong> Tags will be numbered sequentially. The exact number of tags
				in circulation will depend on league participation. (e.g., #1 - #50)
			</li>
			<li>
				3.4 <strong>Tag Challenges (Outside of Regular League Events):</strong>
				<ul>
					<li>
						3.4.1 Players may challenge other players for their tag outside of regular league
						events.
					</li>
					<li>
						3.4.2 Challenges must be scheduled and agreed upon by the participating players. Plumas
						Disc Golf is not responsible for organizing or mediating these challenges.
					</li>
					<li>
						3.4.3 The format of the challenge round is to be agreed upon by the players involved.
					</li>
					<li>
						3.4.4 <strong>One-on-One Challenge:</strong> The higher tag number player is the challenger.
						The lower tag number player is the challenged. If the challenger wins, they swap tags with
						the challenged player. If the challenged player wins or the match is tied, they retain their
						tag.
					</li>
					<li>
						3.4.5 <strong>Group Challenge (3 or more players):</strong> The tags are distributed based
						on the finishing order of the group challenge. The player with the best score receives the
						lowest available tag number, the next best score receives the next lowest available tag number,
						and so on.
					</li>
				</ul>
			</li>
			<li>
				3.5 <strong>Tag Loss (During League Events):</strong> Tags are redistributed weekly based on
				the results of the two 9-hole rounds. A player can lose their tag position based on their performance
				in the weekly event.
			</li>
			<li>
				3.6 <strong>Tiebreakers (During League Events):</strong> In the event of a tie in scores
				during a league event, the player with the lower tag number <em>coming into</em> the event will
				be awarded the lower tag number for the following week.
			</li>
			<li>
				3.7 <strong>Attendance Requirement (Top 5 Tags):</strong>
				<ul>
					<li>
						3.7.1 Players holding tags numbered 1 through 5 must attend at least one league event
						every two weeks.
					</li>
					<li>
						3.7.2 <strong>Consequences of Missed Attendance:</strong>
						<ul>
							<li>
								3.7.2.1 <strong>First Offense:</strong> If a player holding one of these top 5 tags misses
								two consecutive league events, they forfeit their tag. The tag will go back into circulation
								and be awarded at the next league event.
							</li>
							<li>
								3.7.2.2 <strong>Multiple Offenses:</strong> Multiple violations of the attendance requirement
								may result in disqualification from the league and/or review by the Plumas Disc Golf
								Disciplinary Committee for potential membership revocation.
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				3.8 <strong>Lost or Damaged Tags:</strong> If a player loses or damages their bag tag, they may
				purchase a replacement tag for $5. The replacement tag will be the next lowest tag number not
				currently in circulation.
			</li>
		</ul>

		<h2>4.0 League Play</h2>
		<ul>
			<li>4.1 <strong>Format:</strong> Two 9-hole rounds of singles stroke play.</li>
			<li>4.2 <strong>Scoring:</strong> UDisc will be used for scoring.</li>
			<li>
				4.3 <strong>Rules:</strong> PDGA rules govern play unless otherwise specified in these league
				rules.
			</li>
		</ul>

		<h2>5.0 Prizes</h2>
		<ul>
			<li>
				5.1 The bag tags themselves are the sole prizes for league participation and achievement.
			</li>
		</ul>

		<h2>6.0 Conduct and Etiquette</h2>
		<ul>
			<li>
				6.1 All participants are expected to adhere to the PDGA Code of Conduct and demonstrate good
				sportsmanship.
			</li>
		</ul>

		<h2>7.0 Fees</h2>
		<ul>
			<li>
				7.1 The only required fee is the annual Plumas Disc Golf membership fee of $25. There are no
				additional league fees, except for replacement tags ($5).
			</li>
		</ul>

		<h2>8.0 Registration</h2>
		<ul>
			<li>
				8.1 To participate in the Plumas Disc Golf Bag Tag Leagues, players must have a UDisc
				account (free accounts are sufficient) and attend any scheduled league event. Assistance
				with creating a UDisc account will be available at league events for those who need it.
			</li>
		</ul>

		<h2>9.0 Rules Disputes</h2>
		<ul>
			<li>
				9.1 Rules disputes will be handled by the League Director, if present. If the League
				Director is not present, rules disputes will be handled by the highest-ranking Club Board
				Member present, in the following order: Board President, Board Vice President, Other Board
				Director.
			</li>
		</ul>

		<h2>10.0 Disqualification</h2>
		<ul>
			<li>
				10.1 Disciplinary issues and potential disqualifications will be handled by the Plumas Disc
				Golf Disciplinary Committee (when formed).
			</li>
		</ul>

		<h2>11.0 Ladies League Specific Rule</h2>
		<ul>
			<li>
				11.1 Only female players are eligible to participate in the Plumas Disc Golf Ladies Tags
				League.
			</li>
		</ul>

		<h2>12.0 Guest Players</h2>
		<ul>
			<li>
				12.1 Guests are welcome to play in league events but are not eligible to compete for tags
				unless they become a Plumas Disc Golf member <em>before</em> the start of the event.
			</li>
			<li>12.2 Guests' scores will be recorded but will not be considered for tag distribution.</li>
			<li>
				12.3 Players who purchase a membership <em>after</em> a league event will be assigned the next
				available tag number not already distributed.
			</li>
		</ul>

		<h2>13.0 Rainouts/Cancellations</h2>
		<ul>
			<li>
				13.1 If a league event is canceled <em>before</em> play begins, tags will not be collected or
				redistributed.
			</li>
			<li>
				13.2 If a league event is canceled <em>during</em> play, tags will be returned to their previous
				holders.
			</li>
		</ul>

		<h2>14.0 League Director Responsibilities</h2>
		<ul>
			<li>14.1 Collecting tags at the beginning of each weekly event.</li>
			<li>14.2 Disbursing tags to players at the end of each weekly event.</li>
			<li>14.3 Accepting membership payments.</li>
			<li>14.4 Managing league events and scoring on UDisc.</li>
			<li>14.5 Handling rules disputes during league play.</li>
		</ul>

		<h2>15.0 Agreement to Rules</h2>
		<ul>
			<li>
				15.1 <strong
					>By participating in any Plumas Disc Golf Bag Tag League event, all players agree to abide
					by these league rules.</strong
				>
			</li>
		</ul>
	</div>
</div>

<style>
	ol {
		list-style-type: none;
		counter-reset: item;
		margin: 0;
		padding: 0;
	}

	li {
		display: table;
		counter-increment: item;
		margin-bottom: 0.6em;
	}

	li:before {
		content: counters(item, '.') '. ';
		display: table-cell;
		padding-right: 0.6em;
	}

	li li {
		margin: 0;
	}

	li li:before {
		content: counters(item, '.') ' ';
	}
</style>
