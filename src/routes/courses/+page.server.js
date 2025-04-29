export async function load({ locals }) {

	const courses = await locals.pb.collection('courses').getFullList({
		expand: 'tags'
	});

	return { courses };
}
