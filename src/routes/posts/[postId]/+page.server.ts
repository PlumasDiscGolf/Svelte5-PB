/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const course = await locals.pb.collection('courses').getOne(params.postId);
	return { course };
}
 export const prerender = false