// src/routes/admin/+layout.js

/**
 * Disables prerendering for the /admin path and all its sub-routes.
 * This is necessary because the /admin page (and potentially others under /admin)
 * uses server-side actions, which cannot be prerendered.
 */
export const prerender = false;
