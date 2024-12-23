import { redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load({ locals }) {
	// const response = await fetch('api/events');
	// const events: Event[] = await response.json();

	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const events = serializeNonPOJOs(
		await locals.pb.collection('events').getFullList()
	);

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
