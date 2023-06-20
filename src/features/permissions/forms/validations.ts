import { z } from "zod";

export const permissionSchema = z.object({
	id: z.string().trim().uuid({ message: "Invalid UUID" }),
	name: z
		.string()
		.trim()
		.min(2, { message: "Must be 2 or more characters long" })
});
export type PermissionSchema = typeof permissionSchema;

export const crudPermissionSchema = permissionSchema.extend({
	id: permissionSchema.shape.id.optional()
});
export type CrudProjectSchema = typeof crudPermissionSchema;
