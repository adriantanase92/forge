import type { TranslationFunctions } from '$i18n/i18n-types';
import { TaskStatus, escapeString } from '$lib/shared';
import { z } from 'zod';

export const taskSchema = (t: TranslationFunctions) =>
	z
		.object({
			id: z.string().optional(),
			title: z
				.string({
					required_error: t.errors.required({
						field: `${t.modules.tasks.entity.single()} ${t.fields.title.text()}`
					})
				})
				.trim()
				.min(6, t.errors.minCharacters({ number: 6 }))
				.max(100, t.errors.maxCharacters({ number: 100 }))
				.transform(escapeString),
			description: z
				.string()
				.trim()
				.max(500, t.errors.maxCharacters({ number: 500 }))
				.transform(escapeString)
				.optional(),
			project: z.string({
				required_error: t.errors.required({
					field: `${t.modules.projects.entity.single()}`
				})
			}),
			responsible: z.string().array().optional(),
			status: z.nativeEnum(TaskStatus)
		})
		.strict();

export type TasksSchema = typeof taskSchema;
