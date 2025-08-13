export async function load({ locals }) {
	const currentDate = new Date();

	const events = await locals.pb.collection('events').getFullList({
		sort: '-endDateTime'
	});


	const upcomingEvents = events.filter((event) => {
		const eventDate = new Date(event.endDateTime);
		return eventDate >= currentDate;
	});

	const pastEvents = events.filter((event) => {
		const eventDate = new Date(event.endDateTime);
		return eventDate < currentDate;
	});

	return { upcomingEvents, pastEvents };
}
