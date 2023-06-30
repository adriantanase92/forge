import type { Model } from "mongoose";
import {
	permissionsList,
	projectsList,
	rolesList,
	tasksList,
	usersList
} from "./seedUtils.js";
import { createMany } from "./utils.js";
import { Permission } from "$features/permissions/schemas/permission.schema.js";
import { Role } from "$features/roles/schemas/role.schema.js";
import { User } from "$features/users/schemas/user.schemas.js";
import { Project } from "$features/projects/schemas/project.schema.js";
import { Task } from "$features/tasks/schemas/task.schemas.js";

async function seedCollection<T>(model: Model<T>, items: any) {
	try {
		// The drop() command destroys all data from a collection.
		// This checks if there is a collection alread and drops it
		if ((await model.countDocuments().exec()) > 0) {
			await model.deleteMany({});
		}

		// Seeding
		console.log(`Start seeding collection ${model.modelName}s`);
		await createMany(model, items);
		console.log("Collection seeded!");

		return {
			success: true
		};
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedPermissions() {
	try {
		await seedCollection(Permission, permissionsList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedRoles() {
	try {
		await seedCollection(Role, rolesList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedUsers() {
	try {
		await seedCollection(User, usersList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedProjects() {
	try {
		await seedCollection(Project, projectsList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedTasks() {
	try {
		await seedCollection(Task, tasksList);
	} catch (err: any) {
		console.log(err.stack);
	}
}
