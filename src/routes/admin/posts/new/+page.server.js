// src/routes/admin/posts/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	return {}; // No data to preload for a new post form
};

export const actions = {
	createPost: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}

		const formData = await request.formData();

		const title = formData.get('title')?.toString();
		const publishedDateStr = formData.get('publishedDate')?.toString();
		const categoriesStr = formData.get('categories')?.toString() || '';
		const content = formData.get('content')?.toString();
		const published = formData.get('published') === 'on';
		const imageFile = formData.get('image'); // File object

		// Server-side validation
		const fieldErrors = {};
		if (!title) fieldErrors.title = 'Title is required.';
		if (!publishedDateStr) fieldErrors.publishedDate = 'Published Date is required.';
		if (!content) fieldErrors.content = 'Content is required.';

		const formattedPublishedDate = formatInputDateToPocketBase(publishedDateStr);
		if (!formattedPublishedDate && publishedDateStr) {
			// Error only if a date was provided but was invalid
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

		// Prepare data for PocketBase
		// Use FormData if including files, otherwise a plain object.
		const dataToSave = new FormData();
		dataToSave.append('title', title);
		dataToSave.append('publishedDate', formattedPublishedDate); // Already validated and formatted

		// Assuming 'categories' is a JSON field in PocketBase expecting an array of strings
		const categoriesArray = categoriesStr
			.split(',')
			.map((cat) => cat.trim())
			.filter((cat) => cat.length > 0);
		categoriesArray.forEach((category) => {
			dataToSave.append('categories', category); // PocketBase handles multiple same-key appends as an array for JSON fields
		});
		// If 'categories' is a simple text field, just do: dataToSave.append('categories', categoriesStr);

		dataToSave.append('content', content);
		dataToSave.append('published', published);

		if (imageFile && imageFile.size > 0) {
			dataToSave.append('image', imageFile); // Ensure 'image' is the file field name in PB
		}

		try {
			await locals.pb.collection('posts').create(dataToSave);
		} catch (err) {
			console.error('Error creating post:', err.response || err.originalError || err);
			let errorMessage = 'Failed to create post.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}

		throw redirect(303, '/admin?tab=tab3&created=post');
	}
};
