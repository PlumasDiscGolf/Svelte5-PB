// src/routes/admin/courses/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	return {}; // No data to preload for new course form
};

export const actions = {
	createCourse: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { createError: 'User not authenticated.' });
		}

		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const numberOfHolesStr = formData.get('numberOfHoles')?.toString();
		const parStr = formData.get('par')?.toString();
		const lengthInFeetStr = formData.get('lengthInFeet')?.toString();
		const location = formData.get('location')?.toString();
		const description = formData.get('description')?.toString() || '';

		// Server-side validation
		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Course Name is required.';
		if (!numberOfHolesStr) fieldErrors.numberOfHoles = 'Number of Holes is required.';
		if (!parStr) fieldErrors.par = 'Course Par is required.';
		if (!location) fieldErrors.location = 'Location is required.';

		const numberOfHoles = parseInt(numberOfHolesStr);
		const par = parseInt(parStr);
		const lengthInFeet = lengthInFeetStr ? parseInt(lengthInFeetStr) : null; // Handle optional length

		if (isNaN(numberOfHoles) && numberOfHolesStr) fieldErrors.numberOfHoles = 'Number of Holes must be a number.';
		if (isNaN(par) && parStr) fieldErrors.par = 'Par must be a number.';
		if (lengthInFeetStr && isNaN(lengthInFeet)) fieldErrors.lengthInFeet = 'Length must be a number if provided.';

		const currentValues = {
			courseName: name,
			courseNumberOfHoles: numberOfHolesStr, // Send back string for prefill
			coursePar: parStr,
			courseLengthInFeet: lengthInFeetStr,
			courseLocation: location,
			courseDescription: description
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToSave = {
			name,
			numberOfHoles,
			par,
			location,
			description
		};
		if (lengthInFeet !== null) {
			// Only include length if provided and valid
			dataToSave.lengthInFeet = lengthInFeet;
		}
		// Add other fields like 'image' if you implement file uploads

		try {
			await locals.pb.collection('courses').create(dataToSave);
		} catch (err) {
			console.error('Error creating course:', err.response || err.originalError || err);
			let errorMessage = 'Failed to create course.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}

		// Redirect to the admin page (courses tab) after successful creation
		throw redirect(303, '/admin?tab=tab2&created=course');
	}
};
