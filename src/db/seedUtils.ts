import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { getRandomIntFromInterval } from "../lib/utils/helpers.js";
import { ObjectId } from "mongodb";

/* ------- Permissions ------ */
export const permissionsList = [
	{
		id: new ObjectId(),
		name: "permissions",
		read: false,
		write: false
	},
	{
		id: new ObjectId(),
		name: "roles",
		read: false,
		write: false
	},
	{
		id: new ObjectId(),
		name: "users",
		read: false,
		write: false
	},
	{
		id: new ObjectId(),
		name: "projects",
		read: false,
		write: false
	},
	{
		id: new ObjectId(),
		name: "tasks",
		read: false,
		write: false
	},
	{
		id: new ObjectId(),
		name: "invoices",
		read: false,
		write: false
	}
];
/* ------- Permissions ------ */

/* ------- Roles ------ */
export const rolesList = [
	{
		id: new ObjectId("64770a6aab3dfa88bf4966eb"),
		name: "admin",
		permissions: [
			...permissionsList.map((permission) => {
				return {
					id: new ObjectId(),
					name: permission.name,
					read: true,
					write: true
				};
			})
		]
	},
	{
		id: new ObjectId("64770a6aab3dfa88bf4966ea"),
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
					id: new ObjectId(),
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
		id: new ObjectId(),
		avatar: faker.image.avatar(),
		firstName: "Adrian",
		lastName: "Tanase",
		role: new ObjectId("64770a6aab3dfa88bf4966eb"),
		email: "tanase.adrian92@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	},
	{
		id: new ObjectId(),
		firstName: "Andreea",
		lastName: "Dragu",
		role: new ObjectId("64770a6aab3dfa88bf4966eb"),
		email: "a.dragu93@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	}
];

const generateRandomUser = (role: "client" | "intermediary"): any => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const roleId = rolesList.filter((r) => r.name === role)[0].id;

	const user = {
		id: new ObjectId(),
		avatar: faker.image.avatar(),
		birthday: faker.date.birthdate({ min: 18, max: 65 }),
		email: faker.internet.email({ firstName, lastName }),
		firstName,
		lastName,
		role: roleId,
		password: hash,
		phone: faker.phone.number("+40 7## ### ###")
	};

	if (role === "client") {
		const projectsIds = [...Array(getRandomIntFromInterval(1, 3))].map(
			() => new ObjectId()
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
const generateProject = (id: string, clientId: string): any => {
	const tasksIds = [...Array(getRandomIntFromInterval(5, 10))].map(
		() => new ObjectId()
	);

	return {
		id,
		name: `Project - ${faker.lorem.word()}`,
		imageUrl: faker.image.urlLoremFlickr({ category: "abstract" }),
		managementToolType: faker.helpers.arrayElement(["internal", "external"]),
		// invoices: null,
		client: clientId,
		status: faker.helpers.arrayElement(["active", "pending", "inactive"]),
		labels: faker.helpers.arrayElements(
			[
				"planning",
				"designing",
				"researching",
				"on-discussions",
				"on-negociating",
				"waiting-for-client"
			],
			{ min: 0, max: 3 }
		),
		tasks: [...tasksIds]
	};
};

const projectsPerClient = clients.map((client) => ({
	clientId: client.id,
	projects: client.projects
}));
const formatedProjectsPerClient = [
	...projectsPerClient.flatMap((p) => {
		const projects: any[] = [];
		p.projects.forEach((id: string) =>
			projects.push({ id, clientId: p.clientId })
		);
		return projects;
	})
];
export const projectsList = [
	...formatedProjectsPerClient.map((project) =>
		generateProject(project.id, project.clientId)
	)
];

/* ------- Projects ------ */

/* ------- Tasks ------ */
const generateTasksForProject = (id: string, projectId: string): any => ({
	id,
	project: projectId,
	title: faker.word.words(8),
	priority: faker.helpers.arrayElement(["high", "medium", "low"]),
	column: faker.helpers.arrayElement(["to-do", "doing", "done", "backlog"]),
	labels: faker.helpers.arrayElements(["development", "design", "testing"], {
		min: 0,
		max: 3
	})
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
