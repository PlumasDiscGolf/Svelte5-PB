// src/routes/admin/courses/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const course = await locals.pb.collection('courses').getOne(params.id);
		// Return a structuredClone or plain object
		return {
			course: JSON.parse(JSON.stringify(course))
		};
	} catch (err) {
		console.error('Error loading course for editing:', err);
		if (err.status === 404) throw error(404, 'Course not found');
		throw error(500, 'Failed to load course data.');
	}
};

export const actions = {
	updateCourse: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}
		if (!params.id) {
			return fail(400, { error: 'Course ID is missing.' });
		}

		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const numberOfHolesStr = formData.get('numberOfHoles')?.toString();
		const parStr = formData.get('par')?.toString();
		const lengthInFeetStr = formData.get('lengthInFeet')?.toString();
		const location = formData.get('location')?.toString();
		const description = formData.get('description')?.toString() || '';

		const fieldErrors = {};
		if (!name) fieldErrors.name = 'Course Name is required.';
		if (!numberOfHolesStr) fieldErrors.numberOfHoles = 'Number of Holes is required.';
		if (!parStr) fieldErrors.par = 'Course Par is required.';
		if (!location) fieldErrors.location = 'Location is required.';

		const numberOfHoles = parseInt(numberOfHolesStr);
		const par = parseInt(parStr);
		const lengthInFeet = lengthInFeetStr ? parseInt(lengthInFeetStr) : null;

		if (isNaN(numberOfHoles) && numberOfHolesStr) fieldErrors.numberOfHoles = 'Number of Holes must be a number.';
		if (isNaN(par) && parStr) fieldErrors.par = 'Par must be a number.';
		if (lengthInFeetStr && isNaN(lengthInFeet)) fieldErrors.lengthInFeet = 'Length must be a number if provided.';

		const currentValues = {
			courseName: name,
			courseNumberOfHoles: numberOfHolesStr,
			coursePar: parStr,
			courseLengthInFeet: lengthInFeetStr,
			courseLocation: location,
			courseDescription: description
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToUpdate = {
			name,
			numberOfHoles,
			par,
			location,
			description
		};
		if (lengthInFeet !== null) {
			dataToUpdate.lengthInFeet = lengthInFeet;
		} else {
			// If you want to explicitly set lengthInFeet to null in PocketBase if it's empty:
			dataToUpdate.lengthInFeet = null; // Or use delete dataToUpdate.lengthInFeet if PB prefers field absence
		}

		try {
			await locals.pb.collection('courses').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating course:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update course.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			} else if (err.message) {
				errorMessage += ` ${err.message}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}
		throw redirect(303, '/admin?tab=tab2&updated=course');
	}
};
