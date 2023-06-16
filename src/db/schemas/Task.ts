import { columnsEnum, prioritiesEnum } from "$db/enums.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
	{
		id: {
			type: String,
			immutable: true,
			default: () => crypto.randomUUID()
		},
		title: {
			type: String,
			minLength: 2,
			maxLength: 150,
			trim: true,
			required: true
		},
		project: {
			type: String
			// type: mongoose.Types.ObjectId,
			// ref: "Project",
			// required: true
		},
		priority: {
			type: String,
			enum: prioritiesEnum,
			required: true
		},
		column: {
			type: String,
			enum: columnsEnum,
			require: true
		},
		labels: {
			type: [String]
		}
	},
	{ timestamps: true }
);

export const Task = model("Task", taskSchema);
