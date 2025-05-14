// src/routes/admin/board/members/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const member = await locals.pb.collection('boardMembers').getOne(params.id);
		return {
			member: JSON.parse(JSON.stringify(member))
		};
	} catch (err) {
		console.error('Error loading board member for editing:', err);
		if (err.status === 404) throw error(404, 'Board member not found');
		throw error(500, 'Failed to load board member data.');
	}
};

export const actions = {
	updateBoardMember: async ({ request, locals, params }) => {
		if (!locals.user) return fail(401, { error: 'User not authenticated.' });
		if (!params.id) return fail(400, { error: 'Board member ID is missing.' });

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const role = formData.get('role')?.toString();
		const active = formData.get('active') === 'on'; // Checkbox sends 'on' if checked
		// const avatarFile = formData.get('avatar');
		// const deleteExistingAvatar = formData.get('deleteExistingAvatar') === 'true';

		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Name is required.';
		if (!role) fieldErrors.role = 'Role is required.';

		const currentValues = {
			memberName: name,
			memberRole: role,
			memberActive: active
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToUpdate = new FormData(); // Use FormData if handling files
		dataToUpdate.append('name', name);
		dataToUpdate.append('role', role);
		dataToUpdate.append('active', active);

		// if (avatarFile && avatarFile.size > 0) {
		//     dataToUpdate.append('avatarFieldNameInPb', avatarFile);
		// } else if (deleteExistingAvatar) {
		//     dataToUpdate.append('avatarFieldNameInPb', null); // To delete
		// }
		// If no new avatar and not deleting, don't append avatar field.

		try {
			await locals.pb.collection('boardMembers').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating board member:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update board member.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}
		throw redirect(303, '/admin?tab=tab4&updated=boardMember');
	}
};
