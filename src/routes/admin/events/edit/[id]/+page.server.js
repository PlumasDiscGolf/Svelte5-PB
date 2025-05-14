// src/routes/admin/events/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const event = await locals.pb.collection('events').getOne(params.id);
		// Return a structuredClone to avoid passing PocketBase model directly to client
		return {
			event: JSON.parse(JSON.stringify(event)) // Basic deep clone for POJO
		};
	} catch (err) {
		console.error('Error loading event for editing:', err);
		if (err.status === 404) {
			throw error(404, 'Event not found');
		}
		throw error(500, 'Failed to load event data.');
	}
};

export const actions = {
	updateEvent: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}
		if (!params.id) {
			return fail(400, { error: 'Event ID is missing.' });
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const eventType = formData.get('eventType')?.toString() || 'League';
		const startDateTimeStr = formData.get('startDateTime')?.toString();
		const endDateTimeStr = formData.get('endDateTime')?.toString();
		const description = formData.get('description')?.toString() || '';
		// For checkbox: 'on' if checked and submitted, null if not checked and submitted.
		// If name="published" is not sent (e.g. if disabled), it will be null.
		// A hidden input can ensure 'off' is sent if unchecked.
		const publishedStr = formData.get('published')?.toString();
		const published = publishedStr === 'on';

		const eventImage = formData.get('eventImage'); // File object or null
		const deleteExistingImage = formData.get('deleteExistingImage') === 'true';

		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Event Name is required.';
		if (!startDateTimeStr) fieldErrors.startDateTime = 'Start Date & Time is required.';

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, {
				error: 'Please correct the errors in the form.',
				fieldErrors,
				// Return current values to prefill form
				eventName: name,
				eventType,
				eventStartDateTime: startDateTimeStr,
				eventEndDateTime: endDateTimeStr,
				eventDescription: description,
				eventPublished: published
			});
		}

		const dataToUpdate = new FormData(); // Use FormData for potential file uploads
		dataToUpdate.append('name', name);
		dataToUpdate.append('eventType', eventType);
		dataToUpdate.append('description', description);
		dataToUpdate.append('published', published);

		try {
			const formattedStart = formatInputDateToPocketBase(startDateTimeStr);
			if (!formattedStart) throw new Error('Invalid Start Date format on server.');
			dataToUpdate.append('startDateTime', formattedStart);

			if (endDateTimeStr) {
				const formattedEnd = formatInputDateToPocketBase(endDateTimeStr);
				if (!formattedEnd && endDateTimeStr) throw new Error('Invalid End Date format on server.');
				else if (formattedEnd) dataToUpdate.append('endDateTime', formattedEnd);
			} else {
				// To clear a date field in PocketBase, send an empty string
				dataToUpdate.append('endDateTime', '');
			}

			if (eventImage && eventImage.size > 0) {
				dataToUpdate.append('eventImage', eventImage);
			} else if (deleteExistingImage) {
				dataToUpdate.append('eventImage', null); // Sending null should delete file
			}
			// If no new image and deleteExistingImage is false, don't append eventImage, PB keeps old one.

			await locals.pb.collection('events').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating event:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update event.';
			if (err.data && err.data.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, {
				error: errorMessage,
				eventName: name,
				eventType,
				eventStartDateTime: startDateTimeStr,
				eventEndDateTime: endDateTimeStr,
				eventDescription: description,
				eventPublished: published
			});
		}
		throw redirect(303, '/admin?eventUpdated=true');
	}
};
