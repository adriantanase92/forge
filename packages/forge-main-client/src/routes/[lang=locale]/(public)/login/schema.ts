import type { TranslationFunctions } from '$i18n/i18n-types';
import { emailRegex } from '$lib/shared';
import { z } from 'zod';

export const loginSchema = (t: TranslationFunctions) =>
	z
		.object({
			email: z.string().trim().toLowerCase().regex(emailRegex, t.errors.invalidEmail()),
			password: z.string().trim()
		})
		.strict();

export type LoginSchema = typeof loginSchema;
