import type { TranslationFunctions } from '$i18n/i18n-types';
import { PreferredLanguage, emailRegex, escapeString } from '$lib/shared';
import { z } from 'zod';

export const zAddress = z.object({
	country: z.string().trim().min(2).max(100).transform(escapeString).optional(),
	county: z.string().trim().min(2).max(100).transform(escapeString).optional(),
	city: z.string().trim().min(2).max(100).transform(escapeString).optional(),
	street: z.string().trim().min(2).max(100).transform(escapeString).optional(),
	locationNumber: z.string().trim().min(2).max(100).transform(escapeString).optional(),
	zipCode: z.string().trim().min(2).max(100).transform(escapeString).optional()
});

export const userSchema = (t: TranslationFunctions) =>
	z
		.object({
			id: z.string().optional(),
			firstName: z
				.string()
				.trim()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(100, t.errors.maxCharacters({ number: 100 }))
				.transform(escapeString),
			lastName: z
				.string()
				.trim()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(100, t.errors.maxCharacters({ number: 100 }))
				.transform(escapeString),
			email: z.string().trim().toLowerCase().regex(emailRegex, t.errors.invalidEmail()),
			phone: z
				.string()
				.min(1)
				.max(50, t.errors.maxCharacters({ number: 50 }))
				.transform(escapeString)
				.optional(),
			preferredLanguage: z.nativeEnum(PreferredLanguage)
			// address: zAddress.optional()
		})
		.strict();

export type UserSchema = typeof userSchema;
