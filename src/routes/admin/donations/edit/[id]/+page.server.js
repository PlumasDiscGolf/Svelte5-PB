// src/routes/admin/donations/edit/[id]/+page.server.js
import { error, fail, redirect } from '@sveltejs/kit';
import { formatInputDateToPocketBase } from '$lib/utils.js';

export const load = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	try {
		const donation = await locals.pb.collection('donations').getOne(params.id);
		return {
			donation: JSON.parse(JSON.stringify(donation))
		};
	} catch (err) {
		console.error('Error loading donation for editing:', err);
		if (err.status === 404) {
			throw error(404, 'Donation not found');
		}
		throw error(500, 'Failed to load donation data.');
	}
};

export const actions = {
	updateDonation: async ({ request, locals, params }) => {
		if (!locals.user) {
			return fail(401, { error: 'User not authenticated.' });
		}
		if (!params.id) {
			return fail(400, { error: 'Donation ID is missing.' });
		}

		const formData = await request.formData();
		const donorName = formData.get('donorName')?.toString();
		const donorEmail = formData.get('donorEmail')?.toString() || '';
		const amountStr = formData.get('amount')?.toString();
		const donationDateStr = formData.get('donationDate')?.toString();
		const donationType = formData.get('donationType')?.toString() || 'Monetary';
		const notes = formData.get('notes')?.toString() || '';

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

		const dataToUpdate = {
			donorName,
			donorEmail,
			amount,
			donationDate: formattedDonationDate,
			donationType,
			notes
		};

		try {
			await locals.pb.collection('donations').update(params.id, dataToUpdate);
		} catch (err) {
			console.error('Error updating donation:', err.response || err.originalError || err);
			let errorMessage = 'Failed to update donation.';
			if (err.data?.data) {
				errorMessage += ` Details: ${JSON.stringify(err.data.data)}`;
			}
			return fail(500, { ...currentValues, error: errorMessage });
		}
		throw redirect(303, '/admin#donations');
	}
};
