// src/routes/login/+layout.js

/**
 * Disables prerendering for the /login path and all its sub-routes.
 * This is necessary because the /login page (and potentially others under /login)
 * uses server-side actions, which cannot be prerendered.
 */
export const prerender = false;
