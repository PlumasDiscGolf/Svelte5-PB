import type { Event } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { json } from '@sveltejs/kit';

async function getEvents({ locals }) {
	const events: Event[] = async () => {
		try {
			const events = serializeNonPOJOs(
				await locals.pb.collection('events').getFullList()
			);
			return events;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
}

export async function GET() {
	const events = await getEvents();
	return json(events);
}
