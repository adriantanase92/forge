import { message, superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types.js';
import { loginSchema } from './schema.js';
import { redirect } from '@sveltejs/kit';
import { convertSnakeCaseToCamelCase, login } from '$lib/shared/index.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { setSession } from '$lib/server/middleware/session.js';

export const load: PageServerLoad = (async ({ locals: { t }, cookies }) => {
	if (cookies.getAll().length > 0) {
		throw redirect(302, t.routes.protected.dashboard());
	}

	const form = await superValidate(loginSchema(t));

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const {
			request,
			locals: { t },
			fetch,
			cookies
		} = event;
		const formData = await request.formData();
		const form = await superValidate(formData, loginSchema(t));

		if (!form.valid) {
			return message(form, t.errors.invalid_form());
		} else {
			const response = await login({
				fetch,
				apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/login`,
				email: form.data.email,
				password: form.data.password
			});

			if ('error' in response) {
				if (response.error?.error) {
					console.error(`Error: ${response.error?.error}`);
				}

				return message(form, {
					status: 'error',
					text: t.errors[
						convertSnakeCaseToCamelCase(response.error?.errorKey as string)
					]()
				});
			} else {
				// Getting the tokens
				const accessToken = response?.data.accessToken;
				const refreshToken = response?.data.refreshToken;
				// Set cookies session and houdini session
				setSession({ cookies, sessionToken: accessToken, refreshToken });
				// Redirect to dashboard page
				throw redirect(302, t.routes.protected.dashboard());
			}
		}
	}
} satisfies Actions;
