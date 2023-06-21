import { statusesEnum } from "$common/db/enums.js";
import mongoose from "mongoose";
import { Task } from "$features/tasks/schemas/task.schemas.js";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
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
		imageUrl: {
			type: String,
			trim: true,
			default:
				"https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
		},
		client: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: statusesEnum,
			required: true
		},
		labels: {
			type: [String]
		},
		tasks: {
			type: [String]
			// type: [mongoose.Types.ObjectId],
			// ref: "Task"
		},
		invoices: {
			type: String,
			default: ""
		}
	},
	{ timestamps: true }
);

export const Project = model("Project", projectSchema);
