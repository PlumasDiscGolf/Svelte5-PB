/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const event = await locals.pb.collection('events').getOne(params.eventId, {
		expand: 'location',
	});
	return { event };
}
