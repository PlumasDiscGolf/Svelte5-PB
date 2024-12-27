import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// const response = await fetch('api/events');
	// const events: Event[] = await response.json();

	const events = await locals.pb.collection('events').getFullList({
		sort: '-startDateTime'
	});
	const currentDate = new Date();

	const upcomingEvents = events.filter((event) => {
		const eventDate = new Date(event.endDateTime);
		return eventDate >= currentDate;
	});

	const pastEvents = events.filter((event) => {
		const eventDate = new Date(event.endDateTime);
		return eventDate < currentDate;
	});

	// const upcomingEvents = await locals.pb.collection('events').getFullList({
	// 	filter: `startDateTime >= "${currentDate}"`,
	// 	sort: '-startDateTime'
	// });

	// const pastEvents = await locals.pb.collection('events').getFullList({
	// 	filter: `startDateTime < "${currentDate}"`,
	// 	sort: '-startDateTime'
	// });

	return { upcomingEvents, pastEvents };
}
