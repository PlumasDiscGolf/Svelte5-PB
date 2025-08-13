// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	// If user is already logged in, redirect them from /login to /admin
	if (locals.user) {
		console.log('[LOGIN PAGE LOAD] User already logged in, redirecting to /admin. User ID:', locals.user.id);
		throw redirect(303, '/admin');
	}
	return {}; // No data needed for the login page itself
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() || '';
		const password = formData.get('password')?.toString() || '';

		if (!email || !password) {
			return fail(400, { email, loginError: 'Email and Password are required.' });
		}

		console.log('[LOGIN ACTION] Attempting login for email:', email);

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
			// PocketBase authStore on server is now updated.
			// The hooks.server.js will set the cookie in the response.
			console.log('[LOGIN ACTION] Login successful for user ID:', locals.pb.authStore.model?.id);
		} catch (err) {
			console.error('[LOGIN ACTION] Login failed:', err);
			return fail(400, { email, loginError: err.message || 'Invalid credentials or server error.' });
		}

		// On successful login, redirect to the admin page.
		// The browser will make a new GET request to /admin with the new cookie.
		throw redirect(303, '/admin');
	}
};
