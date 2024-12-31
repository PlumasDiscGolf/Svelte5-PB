export async function load({ locals }) {
	const posts = await locals.pb.collection('posts').getFullList({
		sort: '-publishedDate',
		expand: 'categories'
	});

	const publishedPosts = posts.filter((post) => {
		return post.published === true;
	});

	return { publishedPosts };
}
