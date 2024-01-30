export function isAsset(routeId: string | null, url: URL) {
	return (
		routeId === null &&
		(url.pathname.startsWith('/@fs') || url.pathname.endsWith('/favicon.ico'))
	);
}

export function isLocalizedRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/');
}

export function isPublicRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(public)/');
}

export function isLoginRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(public)/login');
}

export function isProtectedRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(protected)/');
}

export function isDashboardRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(protected)/dashboard');
}

export function isLogOutRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(protected)/logout');
}
