// src/routes/admin/+page.server.js
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
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
	const boardMeetings = await locals.pb.collection('boardMeetings').getFullList({ sort: '-meetingDateTime' });
	const boardMembers = await locals.pb.collection('boardMembers').getFullList({});

	// `user` object is already provided by `+layout.server.js` to `data.user`
	return { events, courses, posts, boardMeetings, boardMembers };
};
