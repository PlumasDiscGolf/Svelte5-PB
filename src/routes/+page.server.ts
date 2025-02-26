export async function load({ locals }) {
	const posts = await locals.pb.collection('posts').getList(1, 3, {
		sort: '-publishedDate',
        filter: 'published = true'
	});

	return { posts };
}
