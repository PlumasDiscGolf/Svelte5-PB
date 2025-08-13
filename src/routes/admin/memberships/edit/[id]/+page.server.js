// src/routes/admin/memberships/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const membership = await locals.pb.collection('memberships').getOne(params.id);
		return {
			membership: JSON.parse(JSON.stringify(membership))
		};
	} catch (err) {
		console.error('Error loading membership for editing:', err);
		if (err.status === 404) {
			throw error(404, 'Membership not found');
		}
		throw error(500, 'Failed to load membership data.');
	}
};

export const actions = {
	updateMembership: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}
		if (!params.id) {
			return fail(400, { error: 'Membership ID is missing.' });
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString() || '';
		const memberSinceStr = formData.get('memberSince')?.toString();
		const expiresStr = formData.get('expires')?.toString();
		const active = formData.get('active') === 'on';

		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Member Name is required.';
		if (!memberSinceStr) fieldErrors.memberSince = 'Member Since date is required.';
		if (!expiresStr) fieldErrors.expires = 'Expiration Date is required.';

		const formattedMemberSince = formatInputDateToPocketBase(memberSinceStr);
		if (!formattedMemberSince && memberSinceStr) {
			fieldErrors.memberSince = 'The Member Since date is invalid.';
		}

		const formattedExpiresDate = formatInputDateToPocketBase(expiresStr);
		if (!formattedExpiresDate && expiresStr) {
			fieldErrors.expires = 'The Expiration date is invalid.';
		}

		const currentValues = { name, email, memberSince: memberSinceStr, expires: expiresStr, active };

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToUpdate = {
			name,
			email,
			memberSince: formattedMemberSince,
			expires: formattedExpiresDate,
			active
		};

		try {
			await locals.pb.collection('memberships').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating membership:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update membership.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}

		throw redirect(303, '/admin#memberships');
	}
};
