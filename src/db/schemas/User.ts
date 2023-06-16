import mongoose from "mongoose";
import { Role } from "./Role.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		id: {
			type: String,
			immutable: true,
			default: () => crypto.randomUUID()
		},
		firstName: {
			type: String,
			minLength: 2,
			maxLength: 100,
			trim: true,
			required: true
		},
		lastName: {
			type: String,
			minLength: 2,
			maxLength: 100,
			trim: true,
			required: true
		},
		password: {
			type: String,
			trim: true,
			required: true
		},
		avatar: {
			type: String,
			trim: true,
			default:
				"https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
		},
		role: {
			type: mongoose.Types.ObjectId,
			ref: Role,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			trim: true,
			required: true
		},
		phone: {
			type: String,
			trim: true,
			required: true
		},
		birthday: {
			type: Date
		},
		projects: {
			type: [String]
			// type: [mongoose.Types.ObjectId],
			// ref: "Project"
		}
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);
