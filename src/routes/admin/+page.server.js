// src/routes/admin/+page.server.js
import { fail, redirect } from '@sveltejs/kit';

// Your existing load function (remains the same)
export const load = async ({ locals }) => {
	// console.log('[ADMIN +page.server.js] load: locals.user?.id:', locals.user?.id);
	// Only load this data if the user is actually logged in, otherwise it's wasted effort
	// However, if you want the data pre-loaded for when they DO log in on this page, keep it.
	// For now, let's assume it's fine to load it, UI will hide it if not logged in.
	const events = await locals.pb.collection('events').getFullList({
		sort: '-endDateTime'
	});
	const courses = await locals.pb.collection('courses').getFullList({
		sort: 'name'
	});
	const posts = await locals.pb.collection('posts').getFullList({
		sort: '-publishedDate'
	});
	const boardMeetings = await locals.pb.collection('boardMeetings').getFullList({
		sort: '-meetingDateTime'
	});
	const boardMembers = await locals.pb.collection('boardMembers').getFullList({});
	// `user` is already provided by +layout.server.js through `data.user`
	return { events, courses, posts, boardMeetings, boardMembers };
};

// NEW: Add SvelteKit form actions
/** @type {import('./$types').Actions} */
export const actions = {
	// Action for Login
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() || ''; // Ensure it's a string
		const password = formData.get('password')?.toString() || ''; // Ensure it's a string

		console.log('[ADMIN ACTION] Attempting server-side login for email:', email);

		try {
			// Use locals.pb (server-side instance) to authenticate
			await locals.pb.collection('users').authWithPassword(email, password);
			// If successful, locals.pb.authStore is updated on the server.
			// The hooks.server.js will then use this updated authStore to set the cookie
			// in the response of THIS action.
			console.log('[ADMIN ACTION] Server-side login successful for user ID:', locals.pb.authStore.model?.id);
			// No need to redirect here if using enhance; SvelteKit will reload data for the current page.
			// If not using enhance, or for clearer state change, a redirect can be good:
			// throw redirect(303, '/admin');
		} catch (err) {
			console.error('[ADMIN ACTION] Server-side login failed:', err);
			// Return a failure state with the error message to display on the form
			return fail(400, {
				email: email, // Send back the email to prefill the form
				loginError: err.message || 'Invalid credentials or server error.'
			});
		}

		// If successful, just returning nothing or a success marker is fine.
		// SvelteKit's form enhancement will cause page data to reload.
		return { success: true };
	},

	// Action for Logout
	logout: async ({ locals }) => {
		console.log('[ADMIN ACTION] Server-side logout for user ID:', locals.pb.authStore.model?.id);
		locals.pb.authStore.clear(); // Clears server-side auth store
		// The hooks.server.js will export an empty/cleared cookie.
		// throw redirect(303, '/admin'); // Redirect to ensure page reloads in logged-out state
		return { success: true };
	}
};
