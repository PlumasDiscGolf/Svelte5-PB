import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
    redirect(308, '/');
}) satisfies PageLoad;