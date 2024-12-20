import type { Event } from '$lib/types';

export async function load() {
	const events: Event[] = [
		{
			startDate: '2024-09-13',
			endDate: '2024-11-01',
			name: 'Putting League',
			slug: '2024-putting-league',
			shortDescription:
				'Calling all disc golfers in Quincy, CA! Join the Plumas Disc Golf Putting League starting Sept 13th at Rich Bar Taproom. Weekly putting comps, cash payouts, & community vibes. $5 entry fee.',
			description:
				"<p>Hey Disc Golfers!</p><p>We're thrilled to announce the launch of the Plumas Disc Golf Putting League! Whether you're a seasoned pro or just starting out, this is a fantastic opportunity to hone your putting skills, meet fellow disc golf enthusiasts, and have a great time.</p><p><strong>League Overview:</strong></p><ul><li><strong>Start Date:</strong> September 13, 2024</li><li><strong>Location:</strong> Rich Bar Taproom, Quincy</li><li><strong>Time:</strong> 5:30 PM</li><li><strong>Entry Fee:</strong> $5 Weekly</li></ul><p><strong>What to Expect:</strong></p><ul><li><strong>Weekly Competitions:</strong> Engage in friendly, competitive putting challenges each week. Test your skills and see how you stack up against other players.</li><li><strong>Payouts:</strong> Cash payouts for the top few participants each week, with amounts dependent on attendance.</li><li><strong>Community:</strong> Connect with other disc golf lovers and enjoy the camaraderie of the sport. This is a great chance to make new friends and share tips and strategies.</li></ul><p><strong>Why Join?</strong></p><ul><li><strong>Skill Development:</strong> Focused putting practice is essential for improving your game. Our league provides a structured environment to enhance your accuracy and consistency.</li><li><strong>Prizes and Recognition:</strong> Weekly winners will receive cash payouts, and you'll have the chance to earn bragging rights as one of the top putters in the league.</li></ul><p><strong>Registration Details:</strong></p><ul><li><strong>How to Register:</strong> Simply show up at the Rich Bar Taproom on league nights. No pre-registration required, just bring your A-game and $5 for the entry fee.</li></ul><p><strong>Join Us!</strong></p><p>Don't miss out on the fun and the chance to improve your game. We can't wait to see you on the course!</p><p>For more information, feel free to contact us at info@plumasdiscgolf.com.</p>",
			location: 'Rich Bar Taproom, Quincy, CA',
			imageURL:
				'https://storage.googleapis.com/plumasdiscgolf-f3247.appspot.com/Events/2024/Putting%20League/Putting%20League%20Flyer.png',
			registrationURL: '',
			pdgaURL: '',
			discGolfSceneURL: '',
			eventInfoURL: '',
			resultsURL: '',
			publishDate: '',
			published: true,
			resultsPosted: true
		},
		{
			startDate: '2024-04-13',
			endDate: '2024-10-16',
			name: 'Plumas Disc Golf Bag Tags League',
			slug: '2024-bag-tags',
			shortDescription:
				'<p>Every Wednesday at Pioneer Park Disc Golf Course at 5:30PM. &nbsp;Come join us to play for the lowest tag!</p>',
			description:
				'<p>Every Wednesday at Pioneer Park Disc Golf Course at 5:30PM. &nbsp;Come join us to play for the lowest tag!</p>',
			location: 'Pioneer Park Disc Golf Course',
			imageURL:
				'https://storage.googleapis.com/plumasdiscgolf-f3247.appspot.com/Events/2024/Bag%20Tags/2024_Bag_Tags.jpg',
			registrationURL: 'https://plumasdiscgolf.com/membership',
			pdgaURL: '',
			discGolfSceneURL: '',
			eventInfoURL: '',
			resultsURL: '',
			publishDate: '',
			published: true,
			resultsPosted: false
		}
	];

	const currentDate = new Date();

	const upcomingEvents = events.filter((event) => {
		const eventDate = new Date(event.endDate);
		return eventDate >= currentDate;
	});

	const pastEvents = events.filter((event) => {
		const eventDate = new Date(event.endDate);
		return eventDate < currentDate;
	});
	return { upcomingEvents, pastEvents };
}
