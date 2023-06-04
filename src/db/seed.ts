import { permissions, projects, roles, tasks, users } from "./collections.js";
import { permissionsList, projectsList, rolesList, tasksList, usersList } from "./seedUtils.js";
import { createMany } from "./utils.js";

async function seedCollection(collection: any, items: any) {
	try {
		// The drop() command destroys all data from a collection.
		// This checks if there is a collection alread and drops it
		if ((await collection.countDocuments()) > 0) {
			await collection.drop();
		}

		// Seeding
		console.log(`Start seeding collection ${collection}`);
		await createMany(collection, items);
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
		await seedCollection(permissions, permissionsList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedRoles() {
	try {
		await seedCollection(roles, rolesList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedUsers() {
	try {
		await seedCollection(users, usersList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedProjects() {
	try {
		await seedCollection(projects, projectsList);
	} catch (err: any) {
		console.log(err.stack);
	}
}

export async function seedTasks() {
	try {
		await seedCollection(tasks, tasksList);
	} catch (err: any) {
		console.log(err.stack);
	}
}
