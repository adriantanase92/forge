import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const permissionSchema = new Schema(
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
		read: {
			type: Boolean,
			default: false
		},
		write: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

export const Permission = model("Permission", permissionSchema);
