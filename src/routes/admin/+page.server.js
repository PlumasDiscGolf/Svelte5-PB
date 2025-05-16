// src/routes/admin/+page.server.js
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const itemsPerPage = 10; // Define how many items per page, can be made dynamic later

	// Get page numbers from URL query parameters, default to 1
	const eventsPage = parseInt(url.searchParams.get('eventsPage') || '1');
	const coursesPage = parseInt(url.searchParams.get('coursesPage') || '1');
	const postsPage = parseInt(url.searchParams.get('postsPage') || '1');
	const boardMembersPage = parseInt(url.searchParams.get('boardMembersPage') || '1');
	const boardMeetingsPage = parseInt(url.searchParams.get('boardMeetingsPage') || '1');
	// Add for new sections like membershipsPage, etc.

	try {
		const eventsData = await locals.pb.collection('events').getList(eventsPage, itemsPerPage, {
			sort: '-startDateTime' // Ensure consistent sort order for pagination
			// requestKey: null // Set to null to prevent caching if you see stale data during dev
		});

		const coursesData = await locals.pb.collection('courses').getList(coursesPage, itemsPerPage, {
			sort: 'name'
			// requestKey: null
		});

		const postsData = await locals.pb.collection('posts').getList(postsPage, itemsPerPage, {
			sort: '-publishedDate'
			// requestKey: null
		});

		const boardMembersData = await locals.pb.collection('boardMembers').getList(boardMembersPage, itemsPerPage, {
			sort: 'name' // Or by role, etc.
			// requestKey: null
		});

		const boardMeetingsData = await locals.pb.collection('boardMeetings').getList(boardMeetingsPage, itemsPerPage, {
			sort: '-meetingDateTime'
			// requestKey: null
		});

		// Note: locals.user is already passed by the root +layout.server.js
		return {
			eventsData: JSON.parse(JSON.stringify(eventsData)), // PaginatedList object
			coursesData: JSON.parse(JSON.stringify(coursesData)),
			postsData: JSON.parse(JSON.stringify(postsData)),
			boardMembersData: JSON.parse(JSON.stringify(boardMembersData)),
			boardMeetingsData: JSON.parse(JSON.stringify(boardMeetingsData)),
			// Pass current page numbers back to the client for UI state
			currentEventsPage: eventsPage,
			currentCoursesPage: coursesPage,
			currentPostsPage: postsPage,
			currentBoardMembersPage: boardMembersPage,
			currentBoardMeetingsPage: boardMeetingsPage,
			itemsPerPage: itemsPerPage
		};
	} catch (err) {
		console.error('Error loading admin data for pagination:', err);
		// Return empty or error state for each data type
		return {
			eventsData: { items: [], page: 1, perPage: itemsPerPage, totalItems: 0, totalPages: 0 },
			coursesData: { items: [], page: 1, perPage: itemsPerPage, totalItems: 0, totalPages: 0 },
			// ... and so on for other sections
			error: 'Failed to load some admin data.'
		};
	}
};
