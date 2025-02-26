/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const post = await locals.pb.collection('posts').getOne(params.postId);
	return { post };
}
 export const prerender = false