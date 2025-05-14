// src/routes/logout/+page.server.js
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	console.log('[LOGOUT PAGE LOAD] Clearing auth store for user ID:', locals.pb.authStore.model?.id);
	locals.pb.authStore.clear(); // Clears server-side auth store
	// The hooks.server.js will ensure an empty/cleared cookie is sent back.

	// Redirect to homepage or login page after logout
	throw redirect(303, '/login'); // Or '/' for homepage
};
