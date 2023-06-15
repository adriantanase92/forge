import { z } from "zod";

export const projectSchema = z.object({
	id: z.string().trim().uuid({ message: "Invalid UUID" }),
	name: z
		.string()
		.trim()
		.min(2, { message: "Must be 2 or more characters long" })
		.max(30, { message: "Must not have more than 30 characters" }),
	imageUrl: z.string().trim().url("Must be a valid URL"),
	managementToolType: z.enum(["external", "internal"]).default("external"),
	client: z.string().trim().uuid({ message: "Invalid UUID" }),
	status: z.enum(["active", "pending", "inactive"]).default("active"),
	labels: z.string().array().max(3)
});

export type ProjectSchema = typeof projectSchema;

export const crudProjectSchema = projectSchema.extend({
	id: projectSchema.shape.id.optional()
});

export type CrudProjectSchema = typeof crudProjectSchema;
