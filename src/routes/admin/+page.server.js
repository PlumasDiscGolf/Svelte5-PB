export const load = (async ({locals}) => {
    const events = await locals.pb.collection('events').getFullList({
			sort: '-endDateTime'
		});
    return {events};
})