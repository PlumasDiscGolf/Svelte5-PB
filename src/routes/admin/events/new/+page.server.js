// src/routes/admin/events/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils'; // We'll create this utility

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	// No data needed to preload for a new event form
	return {};
};

export const actions = {
	createEvent: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}

		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const eventType = formData.get('eventType')?.toString() || 'League';
		const startDateTimeStr = formData.get('startDateTime')?.toString();
		const endDateTimeStr = formData.get('endDateTime')?.toString();
		const description = formData.get('description')?.toString() || '';
		const published = formData.get('published') === 'on'; // Checkbox value is 'on' or null
		const eventImage = formData.get('eventImage'); // This will be a File object

		// Basic server-side validation
		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Event Name is required.';
		if (!startDateTimeStr) fieldErrors.startDateTime = 'Start Date & Time is required.';

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, {
				error: 'Please correct the errors in the form.',
				fieldErrors,
				eventName: name,
				eventType,
				eventStartDateTime: startDateTimeStr,
				eventEndDateTime: endDateTimeStr,
				eventDescription: description,
				eventPublished: published
			});
		}

		const dataToSave = new FormData(); // Use FormData for file uploads
		dataToSave.append('name', name);
		dataToSave.append('eventType', eventType);
		dataToSave.append('description', description);
		dataToSave.append('published', published);

		try {
			const formattedStart = formatInputDateToPocketBase(startDateTimeStr);
			if (!formattedStart) throw new Error('Invalid Start Date format on server.');
			dataToSave.append('startDateTime', formattedStart);

			if (endDateTimeStr) {
				const formattedEnd = formatInputDateToPocketBase(endDateTimeStr);
				if (!formattedEnd && endDateTimeStr)
					throw new Error('Invalid End Date format on server.'); // only error if a value was provided but was invalid
				else if (formattedEnd) dataToSave.append('endDateTime', formattedEnd);
			}

			if (eventImage && eventImage.size > 0) {
				dataToSave.append('eventImage', eventImage);
			}

			await locals.pb.collection('events').create(dataToSave);
		} catch (err) {
			console.error('Error creating event:', err.response || err.originalError || err);
			let errorMessage = 'Failed to create event.';
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

		// Redirect to the admin page after successful creation
		throw redirect(303, '/admin?eventCreated=true'); // Add a query param for potential success message
	}
};
