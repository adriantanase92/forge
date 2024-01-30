/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Cookies, type RequestEvent, redirect } from '@sveltejs/kit';
import { isAsset, type CurrentLoggedInUser, isLoginRoute, getRefreshToken } from '$lib/shared';
import type { MiddlewareBuilder } from './utils';
import { decrypt, encrypt } from '../crypting';
import type { JwtPayload } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

/** Implements the `session` middleware interface */
export default (({ logger, event, resolve }) => {
	return {
		canSkip() {
			return isAsset(event.route.id, event.url) || isLoginRoute(event.route.id);
		},
		resolve() {
			return resolve(event);
		},
		async run() {
			return await Promise.resolve(hasSession())
				.then(checkSession)
				.then((_) => resolve(event));
		}
	};

	/**
	 * Checks the current request already contains a session in cookies. If not
	 * it redirect to the `/login` page to let the user obtain one before
	 * reaching its original requested page. Otherwise it returns the `session`.
	 */
	async function hasSession(): Promise<SessionDataType> {
		const session = getSession(event.cookies);

		if (session) {
			logger.info('session exists', { session });
			event.locals.currentLoggedInUser = structuredClone(
				setUserDataFromTokenToLocals(session.sessionToken)
			);
			return session;
		} else {
			logger.info('session not found', { event });
			await resetData(event);
			throw redirect(303, await toLogIn(event));
		}
	}

	/**
	 * Checks that specified `session` is still valid on the backend side. If
	 * not valid, then deletes the session from the cookies and redirects to
	 * the `/login` page.
	 *
	 * @param session
	 * Session hash to validate.
	 */
	async function checkSession(session: SessionDataType): Promise<SessionDataType | RequestEvent> {
		if (session === undefined) {
			return event;
		}

		try {
			const payloadData: JwtPayload = jwtDecode(session.sessionToken);
			const tokenExpirationTime = payloadData.tokenExpireTime;
			const timeOfToken = payloadData.timeOfToken;
			const refreshToken = session.refreshToken;

			if (
				tokenExpirationTime &&
				isTimeDifferenceGreaterThanSeconds(tokenExpirationTime, timeOfToken)
			) {
				// Token has expired, perform token refresh
				const refreshedTokenResponse = await getRefreshToken({
					fetch: event.fetch,
					apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/refresh-token`,
					oldToken: session.sessionToken,
					refreshToken
				});

				if ('error' in refreshedTokenResponse) {
					logger.info('error retrieving the refresh token', {
						err: refreshedTokenResponse.error
					});
					await resetData(event);
					throw redirect(303, await toLogIn(event));
				} else {
					const newAccessToken = refreshedTokenResponse.data.accessToken;
					const newRefreshToken = refreshedTokenResponse.data.refreshToken;
					// Update the access token in cookies with the refreshed token
					setSession({
						cookies: event.cookies,
						sessionToken: newAccessToken,
						refreshToken: newRefreshToken
					});
					// Update user data from the new token
					event.locals.currentLoggedInUser = structuredClone(
						setUserDataFromTokenToLocals(newAccessToken)
					);
					logger.info('session valid');
					return session;
				}
			} else {
				logger.info('session valid');
				return session;
			}
		} catch (err) {
			logger.info('session expired', { err, event });
			await resetData(event);
			throw redirect(303, await toLogIn(event));
		}
	}

	/**
	 * Gets the `redirectTo` query string parameter to add to the current url.
	 * This is used only when the session is not valid and needs the user to
	 * signing-in before accessing its original requested page.
	 */
	async function toLogIn({ locals: { t } }: RequestEvent) {
		const redirectTo = `${t.routes.public.logIn()}`;
		return redirectTo;
	}
}) satisfies MiddlewareBuilder;

/**
 * Sets a user session across the application.
 *
 * @param cookies
 * Request cookies object.
 *
 * @param sessionToken
 * Session value to set.
 */
export function setSession({
	cookies,
	sessionToken,
	refreshToken
}: {
	cookies: Cookies;
	sessionToken: string;
	refreshToken: string;
}) {
	const data = {
		sessionToken,
		refreshToken
	};
	const encryptedData = encrypt(JSON.stringify(data));
	cookies.set(SESSION_KEY, encryptedData, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax'
	});
}

/**
 * Get the session data from the cookies.
 *
 * @param cookies
 * Request cookies object.
 */
export function getSession(cookies: Cookies): SessionDataType | null {
	const encryptedData = cookies.get(SESSION_KEY);
	if (!encryptedData) return null;
	return JSON.parse(decrypt(encryptedData));
}

/**
 * Deletes all information used for creating and using a session.
 *
 * @param event
 * Request event object.
 */
export const resetData = async (event: RequestEvent) => {
	const { cookies } = event;
	let {
		locals: { currentLoggedInUser }
	} = event;
	deleteSession(cookies);
	currentLoggedInUser = null;
};

/**
 * Deletes a user session.
 *
 * @param cookies
 * Request cookies object.
 */
export function deleteSession(cookies: Cookies) {
	cookies.delete(SESSION_KEY, {
		path: '/'
	});
}

export const setUserDataFromTokenToLocals = (sessionToken: string): CurrentLoggedInUser => {
	// Decode the session token to extract data
	const payloadData: JwtPayload = jwtDecode(sessionToken);
	const isAuthenticated = true;

	return {
		isAuthenticated,
		...payloadData.currentUser
	};
};

type SessionDataType = {
	sessionToken: string;
	refreshToken: string;
};

/** Obtain the key used user session key in request cookies. */
const SESSION_KEY = 'sessionid';

const isTimeDifferenceGreaterThanSeconds = (
	timeDifferenceInSeconds: number,
	dateInMilliseconds: number
) => {
	const currentTime = Date.now();
	const timeDifferenceInMilliseconds = currentTime - dateInMilliseconds;
	return timeDifferenceInMilliseconds > timeDifferenceInSeconds;
};
