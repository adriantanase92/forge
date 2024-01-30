/**
 * Since most of our pages requires authentication we don't prerender them
 * during build time. This preset should be set case by case since it its
 * purpose is to optimize static assets in production.
 *
 * See: https://kit.svelte.dev/docs/page-options#prerender
 */
export const prerender = false;
