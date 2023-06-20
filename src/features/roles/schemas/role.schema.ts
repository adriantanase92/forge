import mongoose from "mongoose";
import { permissionSchema } from "$features/permissions/schemas/permission.schema.js";

const { Schema, model } = mongoose;

const roleSchema = new Schema(
	{
		id: {
			type: String,
			immutable: true,
			default: () => crypto.randomUUID()
		},
		name: {
			type: String,
			minLength: 2,
			maxLength: 100,
			trim: true,
			required: true
		},
		permissions: {
			type: [permissionSchema]
		}
	},
	{ timestamps: true }
);

export const Role = model("Role", roleSchema);
