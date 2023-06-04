import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { createMany } from "./utils.js";
import { projects, tasks } from "./collections.js";
import { getRandomIntFromInterval } from "../lib/utils/helpers.js";

/* ------- Permissions ------ */
export const permissionsList = [
	{
		id: faker.string.uuid(),
		name: "permissions",
		read: false,
		write: false
	},
	{
		id: faker.string.uuid(),
		name: "roles",
		read: false,
		write: false
	},
	{
		id: faker.string.uuid(),
		name: "users",
		read: false,
		write: false
	},
	{
		id: faker.string.uuid(),
		name: "projects",
		read: false,
		write: false
	},
	{
		id: faker.string.uuid(),
		name: "tasks",
		read: false,
		write: false
	},
	{
		id: faker.string.uuid(),
		name: "invoices",
		read: false,
		write: false
	}
];
/* ------- Permissions ------ */

/* ------- Roles ------ */
export const rolesList = [
	{
		id: "4136cd0b-d90b-4af7-b485-123456789001",
		name: "admin",
		permissions: [
			...permissionsList.map((permission) => {
				return {
					id: faker.string.uuid(),
					name: permission.name,
					read: true,
					write: true
				};
			})
		]
	},
	{
		id: "4136cd0b-d90b-4af7-b485-123456789002",
		name: "client",
		permissions: [
			...permissionsList.map((permission) => {
				const access =
					permission.name === "projects" ||
					permission.name === "tasks" ||
					permission.name === "invoices"
						? true
						: false;

				return {
					id: faker.string.uuid(),
					name: permission.name,
					read: access,
					write: access
				};
			})
		]
	}
];
/* ------- Roles ------ */

/* ------- Users ------ */
const salt = genSaltSync(10);
const hash = hashSync("Admin@1", salt);

const admins = [
	{
		id: faker.string.uuid(),
		avatar: faker.image.avatar(),
		firstName: "Adrian",
		middleName: "",
		lastName: "Tanase",
		role: "4136cd0b-d90b-4af7-b485-123456789001",
		email: "tanase.adrian92@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	},
	{
		id: faker.string.uuid(),
		firstName: "Andreea",
		middleName: "",
		lastName: "Dragu",
		role: "4136cd0b-d90b-4af7-b485-123456789001",
		email: "a.dragu93@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	}
];

const generateRandomUser = (role: "client" | "intermediary"): any => {
	const firstName = faker.person.firstName();
	const middleName = faker.person.middleName();
	const lastName = faker.person.lastName();
	const roleId = rolesList.filter((r) => r.name === role)[0].id;

	const user = {
		id: faker.string.uuid(),
		avatar: faker.image.avatar(),
		birthday: faker.date.birthdate({ min: 18, max: 65 }),
		email: faker.internet.email({ firstName, lastName }),
		firstName,
		middleName,
		lastName,
		role: roleId,
		password: hash,
		phone: faker.phone.number("+40 7## ### ###")
	};

	if (role === "client") {
		const projectsIds = [...Array(getRandomIntFromInterval(1, 3))].map(() =>
			faker.string.uuid()
		);

		return {
			...user,
			projects: [...projectsIds]
		};
	}

	return user;
};

const clients = [...Array(30)].map(() => generateRandomUser("client"));

export const usersList = [...admins, ...clients];
/* ------- Users ------ */

/* ------- Projects ------ */
const generateProject = (id: string): any => {
	const tasksIds = [...Array(getRandomIntFromInterval(5, 10))].map(() =>
		faker.string.uuid()
	);

	return {
		id,
		name: `Project - ${faker.lorem.word()}`,
		imageUrl: faker.image.urlLoremFlickr({ category: "abstract" }),
		managementType: faker.helpers.arrayElement(["internal", "external"]),
		invoices: {},
		tasks: [...tasksIds]
	};
};

const projectsIds = [...clients.flatMap((client) => client.projects)];
export const projectsList = [...projectsIds.map((id) => generateProject(id))];
/* ------- Projects ------ */

/* ------- Tasks ------ */
const generateTasksForProject = (id: string, projectId: string): any => ({
	id,
	project: projectId,
	title: faker.word.words(8),
	priority: faker.helpers.arrayElement(["high", "medium", "low"]),
	status: faker.helpers.arrayElement(["to-do", "doing", "done", "backlog"])
});

const tasksPerProject = projectsList.map((project) => ({
	projectId: project.id,
	tasks: project.tasks
}));
const formatedTasksPerProject = [
	...tasksPerProject.flatMap((t) => {
		const tasks: any[] = [];
		t.tasks.forEach((id: string) =>
			tasks.push({ taskId: id, taskProjectId: t.projectId })
		);
		return tasks;
	})
];
export const tasksList = [
	...formatedTasksPerProject.map((task) =>
		generateTasksForProject(task.taskId, task.taskProjectId)
	)
];
/* ------- Tasks ------ */
