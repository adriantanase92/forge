import { env as importedEnv } from '$env/dynamic/private';

/** Keys of all env variables required by the app. */
const secretKeys = ['ENCYPTION_SECRET', 'ENCYPTION_SALT'] as const;

/** Key / value map of all required env variables. */
export const secrets: Record<(typeof secretKeys)[number], string> = secretKeys.reduce(
	(newEnv, key) => Object.defineProperty(newEnv, key, { value: importedEnv[key] }),
	{} as Record<(typeof secretKeys)[number], string>
);
