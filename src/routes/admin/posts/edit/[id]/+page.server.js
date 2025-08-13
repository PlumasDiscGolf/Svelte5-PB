// src/routes/admin/posts/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const post = await locals.pb.collection('posts').getOne(params.id);
		return {
			post: JSON.parse(JSON.stringify(post)) // Send as plain object
		};
	} catch (err) {
		console.error('Error loading post for editing:', err);
		if (err.status === 404) throw error(404, 'Post not found');
		throw error(500, 'Failed to load post data.');
	}
};

export const actions = {
	updatePost: async ({ request, locals, params }) => {
		if (!locals.user) return fail(401, { error: 'User not authenticated.' });
		if (!params.id) return fail(400, { error: 'Post ID is missing.' });

		const formData = await request.formData();
		const title = formData.get('title')?.toString();
		const publishedDateStr = formData.get('publishedDate')?.toString();
		const categoriesStr = formData.get('categories')?.toString() || '';
		const content = formData.get('content')?.toString();
		const published = formData.get('published') === 'on';
		const imageFile = formData.get('image');
		const deleteExistingImage = formData.get('deleteExistingImage') === 'true';

		const fieldErrors = {};
		if (!title) fieldErrors.title = 'Title is required.';
		if (!publishedDateStr) fieldErrors.publishedDate = 'Published Date is required.';
		if (!content) fieldErrors.content = 'Content is required.';

		const formattedPublishedDate = formatInputDateToPocketBase(publishedDateStr);
		if (!formattedPublishedDate && publishedDateStr) {
			fieldErrors.publishedDate = 'Published Date is invalid.';
		}

		const currentValues = {
			postTitle: title,
			postPublishedDate: publishedDateStr,
			postCategories: categoriesStr,
			postContent: content,
			postPublished: published
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToUpdate = new FormData();
		dataToUpdate.append('title', title);
		dataToUpdate.append('publishedDate', formattedPublishedDate);
		const categoriesArray = categoriesStr
			.split(',')
			.map((cat) => cat.trim())
			.filter((cat) => cat.length > 0);
		categoriesArray.forEach((category) => dataToUpdate.append('categories', category));
		dataToUpdate.append('content', content);
		dataToUpdate.append('published', published);

		if (imageFile && imageFile.size > 0) {
			dataToUpdate.append('image', imageFile);
		} else if (deleteExistingImage) {
			dataToUpdate.append('image', null); // Sending null for a file field deletes it in PB
		}
		// If no new image and not deleting, don't append 'image', PB keeps old one.

		try {
			await locals.pb.collection('posts').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating post:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update post.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}
		throw redirect(303, '/admin?tab=tab3&updated=post');
	}
};
