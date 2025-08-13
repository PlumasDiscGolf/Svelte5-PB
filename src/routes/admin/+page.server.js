// src/routes/admin/+page.server.js
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// Protect this route: if no user, redirect to login
	if (!locals.user) {
		console.log('[ADMIN PAGE LOAD] No user found, redirecting to /login.');
		throw redirect(303, '/login');
	}

	console.log('[ADMIN PAGE LOAD] User authenticated, loading admin data. User ID:', locals.user.id);
	// User is authenticated, proceed to load admin-specific data
	const events = await locals.pb.collection('events').getFullList({ sort: '-endDateTime' });
	const courses = await locals.pb.collection('courses').getFullList({ sort: 'name' });
	const posts = await locals.pb.collection('posts').getFullList({ sort: '-publishedDate' });
	const boardMeetings = await locals.pb.collection('board_meetings').getFullList({ sort: '-meetingDateTime' });
	const boardMembers = await locals.pb.collection('board_members').getFullList({ sort: '-sortOrder' });
	const donations = await locals.pb.collection('donations').getFullList({ sort: '-donationDate' });
	const volunteers = await locals.pb.collection('volunteers').getFullList({ sort: '-date' });
	const memberships = await locals.pb.collection('memberships').getFullList({ sort: '-created' });

	// `user` object is already provided by `+layout.server.js` to `data.user`
	return { events, courses, posts, boardMeetings, boardMembers, donations, volunteers, memberships };
};

export const actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}

		const formData = await request.formData();
		const collectionName = formData.get('collectionName')?.toString();
		const itemId = formData.get('itemId')?.toString();

		if (!collectionName || !itemId) {
			return fail(400, { error: 'Missing required parameters for deletion.' });
		}

		try {
			await locals.pb.collection(collectionName).delete(itemId);
		} catch (err) {
			console.error(`Error deleting item from ${collectionName}:`, err);
			return fail(500, { error: `Failed to delete item.` });
		}

		// Return a success state. The page will be reloaded by invalidateAll on the client.
		return { success: true };
	}
};