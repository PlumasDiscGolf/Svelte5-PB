// src/routes/admin/board/meetings/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const meeting = await locals.pb.collection('boardMeetings').getOne(params.id);
		return {
			meeting: JSON.parse(JSON.stringify(meeting))
		};
	} catch (err) {
		console.error('Error loading board meeting for editing:', err);
		if (err.status === 404) throw error(404, 'Board meeting not found');
		throw error(500, 'Failed to load board meeting data.');
	}
};

export const actions = {
	updateBoardMeeting: async ({ request, locals, params }) => {
		if (!locals.user) return fail(401, { error: 'User not authenticated.' });
		if (!params.id) return fail(400, { error: 'Board meeting ID is missing.' });

		const formData = await request.formData();
		const meetingDateTimeStr = formData.get('meetingDateTime')?.toString();

		const agendaFile = formData.get('agendaFile'); // File object
		const minutesFile = formData.get('minutesFile'); // File object
		const deleteExistingAgenda = formData.get('deleteExistingAgenda') === 'on';
		const deleteExistingMinutes = formData.get('deleteExistingMinutes') === 'on';

		const fieldErrors = {};
		if (!meetingDateTimeStr) fieldErrors.meetingDateTime = 'Meeting Date & Time is required.';

		const formattedMeetingDateTime = formatInputDateToPocketBase(meetingDateTimeStr);
		if (!formattedMeetingDateTime && meetingDateTimeStr) {
			fieldErrors.meetingDateTime = 'Meeting Date & Time is invalid.';
		}

		const currentValues = {
			meetingDateTime: meetingDateTimeStr
			// Note: Can't easily return file objects for prefill, but can return their names if needed
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		// We are already getting formData, so we can pass it directly if field names match,
		// or build a new one. Building new one for clarity on file handling.
		const dataToUpdate = new FormData();
		dataToUpdate.append('meetingDateTime', formattedMeetingDateTime);

		// Handle Agenda File
		if (agendaFile && agendaFile.size > 0) {
			dataToUpdate.append('agendaFile', agendaFile); // PB field name for agenda file
		} else if (deleteExistingAgenda) {
			dataToUpdate.append('agendaFile', null); // Send null to delete existing file
		}
		// If no new file and not deleting, don't append 'agendaFile', existing remains.

		// Handle Minutes File
		if (minutesFile && minutesFile.size > 0) {
			dataToUpdate.append('minutesFile', minutesFile); // PB field name for minutes file
		} else if (deleteExistingMinutes) {
			dataToUpdate.append('minutesFile', null); // Send null to delete existing file
		}
		// If no new file and not deleting, don't append 'minutesFile', existing remains.

		// If you still have link fields and want to update them
		// const agendaLink = formData.get('agendaLink')?.toString() || '';
		// const minutesLink = formData.get('minutesLink')?.toString() || '';
		// dataToUpdate.append('agendaLink', agendaLink);
		// dataToUpdate.append('minutesLink', minutesLink);

		try {
			await locals.pb.collection('boardMeetings').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating board meeting:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update board meeting.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}
		throw redirect(303, '/admin?tab=tab4&updated=boardMeeting');
	}
};
