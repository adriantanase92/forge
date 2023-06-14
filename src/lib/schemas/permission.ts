import { z } from "zod";

export const createPermissionSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: "Must be 2 or more characters long" })
});
export type CreatePermissionSchema = typeof createPermissionSchema;

export const updatePermissionSchema = z.object({
	id: z.string(),
	name: z
		.string()
		.trim()
		.min(2, { message: "Must be 2 or more characters long" })
});
export type UpdataPermissionSchema = typeof updatePermissionSchema;
