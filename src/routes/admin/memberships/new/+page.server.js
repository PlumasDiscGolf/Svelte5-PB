// src/routes/admin/memberships/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	return {}; // No data to preload for a new form
};

export const actions = {
	createMembership: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString() || '';
		const memberSinceStr = formData.get('memberSince')?.toString();
		const expiresStr = formData.get('expires')?.toString();
		const active = formData.get('active') === 'on';

		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Member Name is required.';
		if (!expiresStr) fieldErrors.expires = 'Expiration Date is required.';

		const formattedMemberSince = formatInputDateToPocketBase(memberSinceStr);
		if (!formattedExpiresDate && memberSinceStr) {
			fieldErrors.expires = 'The member since date is invalid.';
		}

		const formattedExpiresDate = formatInputDateToPocketBase(expiresStr);
		if (!formattedExpiresDate && expiresStr) {
			fieldErrors.expires = 'The expiration date is invalid.';
		}

		const currentValues = { name, email, expires: expiresStr, active, memberSince: memberSinceStr };

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToSave = {
			name,
			email,
			memberSince: formattedMemberSince,
			expires: formattedExpiresDate,
			active,
			notes
		};

		try {
			await locals.pb.collection('memberships').create(dataToSave);
		} catch (err) {
			console.error('Error creating membership:', err.response || err.originalError || err);
			let errorMessage = 'Failed to create membership.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}

		throw redirect(303, '/admin#memberships');
	}
};
