import moment from 'moment';

/**
 * Formats a date string from YYYY-MM-DD or YYYY-MM-DDTHH:mm
 * to a UTC ISO string for PocketBase.
 * Treats input as local time.
 * @param {string | undefined | null} inputDateTime
 * @returns {string | null} UTC ISO string or null if input is invalid/empty
 */
export function formatInputDateToPocketBase(inputDateTime) {
	if (!inputDateTime) return null;
	// Moment can parse both 'YYYY-MM-DD' and 'YYYY-MM-DDTHH:mm' correctly
	// It will assume local time if no timezone info is present.
	const m = moment(inputDateTime);
	if (!m.isValid()) {
		return null; // Or throw an error
	}
	return m.toISOString(); // Converts to UTC and formats
}

/**
 * Formats a UTC ISO string from PocketBase to YYYY-MM-DDTHH:mm
 * for HTML datetime-local input.
 * @param {string | undefined | null} pbDateTime
 * @returns {string} Formatted local datetime string or empty string
 */
export function formatPocketBaseDateToLocalInput(pbDateTime) {
	if (!pbDateTime) return '';
	// Moment parses ISO string and converts to local time by default for formatting
	return moment(pbDateTime).format('YYYY-MM-DDTHH:mm');
}

/**
 * Formats a UTC ISO string from PocketBase to YYYY-MM-DD
 * for HTML date input.
 * @param {string | undefined | null} pbDateTime
 * @returns {string} Formatted local date string or empty string
 */
export function formatPocketBaseDateToDateInput(pbDateTime) {
	if (!pbDateTime) return '';
	return moment(pbDateTime).format('YYYY-MM-DD');
}

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

export const dateOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

export const preventDefault = (handler) => {
	return (e) => {
		e.preventDefault();
		handler(e);
	};
};
