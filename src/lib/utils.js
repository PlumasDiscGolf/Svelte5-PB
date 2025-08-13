import { format, parseISO, isValid } from 'date-fns';

/**
 * Formats a date string from YYYY-MM-DD or YYYY-MM-DDTHH:mm
 * to a UTC ISO string for PocketBase.
 * Treats input as local time.
 * @param {string | undefined | null} inputDateTime
 * @returns {string | null} UTC ISO string or null if input is invalid/empty
 */
export function formatInputDateToPocketBase(inputDateTime) {
	if (!inputDateTime) return null;

	// The native Date constructor correctly parses these formats as local time,
	// mimicking moment's behavior in this specific case.
	const date = new Date(inputDateTime);

	if (!isValid(date)) {
		return null; // Or throw an error
	}

	// .toISOString() correctly converts the date to a UTC string
	return date.toISOString();
}

/**
 * Formats a UTC ISO string from PocketBase to YYYY-MM-DDTHH:mm
 * for HTML datetime-local input.
 * @param {string | undefined | null} pbDateTime
 * @returns {string} Formatted local datetime string or empty string
 */
export function formatPocketBaseDateToLocalInput(pbDateTime) {
	if (!pbDateTime) return '';

	// parseISO handles the UTC string, and format displays it in the local timezone by default.
	const date = parseISO(pbDateTime);
	return format(date, "yyyy-MM-dd'T'HH:mm");
}

/**
 * Formats a UTC ISO string from PocketBase to YYYY-MM-DD
 * for HTML date input.
 * @param {string | undefined | null} pbDateTime
 * @returns {string} Formatted local date string or empty string
 */
export function formatPocketBaseDateToDateInput(pbDateTime) {
	if (!pbDateTime) return '';

	const date = parseISO(pbDateTime);
	return format(date, 'yyyy-MM-dd');
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
