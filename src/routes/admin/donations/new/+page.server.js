// src/routes/admin/donations/new/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	return {}; // No data to preload for a new donation form
};

export const actions = {
	createDonation: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}

		const formData = await request.formData();
		const donorName = formData.get('donorName')?.toString();
		const donorEmail = formData.get('donorEmail')?.toString() || '';
		const amountStr = formData.get('amount')?.toString();
		const donationDateStr = formData.get('donationDate')?.toString();
		const donationType = formData.get('donationType')?.toString() || 'Monetary';
		const notes = formData.get('notes')?.toString() || '';

		// Server-side validation
		const fieldErrors = {};
		if (!donorName) fieldErrors.donorName = 'Donor Name is required.';
		if (!amountStr) fieldErrors.amount = 'Amount is required.';
		if (!donationDateStr) fieldErrors.donationDate = 'Donation Date is required.';

		const amount = parseFloat(amountStr);
		if (isNaN(amount)) fieldErrors.amount = 'Amount must be a valid number.';

		const formattedDonationDate = formatInputDateToPocketBase(donationDateStr);
		if (!formattedDonationDate && donationDateStr) {
			fieldErrors.donationDate = 'Donation Date is invalid.';
		}

		const currentValues = {
			donorName,
			donorEmail,
			amount: amountStr,
			donationDate: donationDateStr,
			donationType,
			notes
		};

		if (Object.keys(fieldErrors).length > 0) {
			return fail(400, { ...currentValues, fieldErrors, error: 'Please correct the errors.' });
		}

		const dataToSave = {
			donorName,
			donorEmail,
			amount,
			donationDate: formattedDonationDate,
			donationType,
			notes
		};

		try {
			await locals.pb.collection('donations').create(dataToSave);
		} catch (err) {
			console.error('Error creating donation:', err.response || err.originalError || err);
			let errorMessage = 'Failed to create donation.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}

		throw redirect(303, '/admin#donations');
	}
};
