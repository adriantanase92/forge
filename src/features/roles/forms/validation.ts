import { permissionSchema } from "$features/permissions/forms/validations.js";
import { z } from "zod";

export const roleSchema = z.object({
	id: z.string().trim().uuid({ message: "Invalid UUID" }),
	name: z
		.string()
		.trim()
		.min(2, { message: "Must be 2 or more characters long" }),
	permissions: z.array(permissionSchema)
});
export type RoleSchema = typeof roleSchema;

export const crudRoleSchema = roleSchema.extend({
	id: roleSchema.shape.id.optional(),
	permissions: roleSchema.shape.permissions.optional()
});
export type CrudRoleSchema = typeof crudRoleSchema;
