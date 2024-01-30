import type { TranslationFunctions } from '$i18n/i18n-types';
import { escapeString } from '$lib/shared';
import { z } from 'zod';

export const projectSchema = (t: TranslationFunctions) =>
	z
		.object({
			id: z.string().optional(),
			name: z
				.string({
					required_error: t.errors.required({
						field: `${t.modules.projects.entity.single()} ${t.fields.name.text()}`
					})
				})
				.trim()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(60, t.errors.maxCharacters({ number: 60 }))
				.transform(escapeString),
			description: z
				.string()
				.trim()
				.max(500, t.errors.maxCharacters({ number: 500 }))
				.transform(escapeString)
				.optional(),
			clients: z.string().array().optional(),
			workers: z.string().array().optional(),
			manager: z.string(),
			tasks: z.array(z.string())
		})
		.strict();

export type ProjectsSchema = typeof projectSchema;
