import type { TranslationFunctions } from '$i18n/i18n-types';
import { escapeString } from '$lib/shared';
import { z } from 'zod';

export const roleSchema = (t: TranslationFunctions) =>
	z
		.object({
			id: z.string().optional(),
			name: z
				.string({
					required_error: t.errors.required({
						field: `${t.modules.roles.entity.single()} ${t.fields.name.text()}`
					})
				})
				.trim()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(60, t.errors.maxCharacters({ number: 60 }))
				.transform(escapeString)
		})
		.strict();

export type RoleSchema = typeof roleSchema;
