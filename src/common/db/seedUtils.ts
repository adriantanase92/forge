import { faker } from "@faker-js/faker";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { getRandomIntFromInterval } from "$common/utils/helpers.js";
import { ObjectId } from "mongodb";

/* ------- Permissions ------ */
export const permissionsList = [
	{
		id: crypto.randomUUID(),
		name: "permissions",
		read: false,
		write: false
	},
	{
		id: crypto.randomUUID(),
		name: "roles",
		read: false,
		write: false
	},
	{
		id: crypto.randomUUID(),
		name: "users",
		read: false,
		write: false
	},
	{
		id: crypto.randomUUID(),
		name: "projects",
		read: false,
		write: false
	},
	{
		id: crypto.randomUUID(),
		name: "tasks",
		read: false,
		write: false
	},
	{
		id: crypto.randomUUID(),
		name: "invoices",
		read: false,
		write: false
	}
];
/* ------- Permissions ------ */

/* ------- Roles ------ */
export const rolesList = [
	{
		_id: new ObjectId("648c123c847c98f99ed8d7a6"),
		id: crypto.randomUUID(),
		name: "admin",
		permissions: [
			...permissionsList.map((permission) => {
				return {
					id: crypto.randomUUID(),
					name: permission.name,
					read: true,
					write: true
				};
			})
		]
	},
	{
		_id: new ObjectId("648c1245393c753289188c43"),
		id: crypto.randomUUID(),
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
					id: crypto.randomUUID(),
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
		id: crypto.randomUUID(),
		avatar: faker.image.avatar(),
		firstName: "Adrian",
		lastName: "Tanase",
		role: new ObjectId("648c123c847c98f99ed8d7a6"),
		email: "tanase.adrian92@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	},
	{
		id: crypto.randomUUID(),
		firstName: "Andreea",
		lastName: "Dragu",
		role: new ObjectId("648c123c847c98f99ed8d7a6"),
		email: "a.dragu93@gmail.com",
		password: hash,
		phone: faker.phone.number("+40 7## ### ###"),
		birthday: faker.date.birthdate({ min: 18, max: 65 })
	}
];

const generateRandomUser = (role: "client" | "intermediary"): any => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	// const roleId = rolesList.filter((r) => r.name === role)[0].id;

	const user = {
		id: crypto.randomUUID(),
		avatar: faker.image.avatar(),
		birthday: faker.date.birthdate({ min: 18, max: 65 }),
		email: faker.internet.email({ firstName, lastName }),
		firstName,
		lastName,
		role: new ObjectId("648c1245393c753289188c43"),
		password: hash,
		phone: faker.phone.number("+40 7## ### ###")
	};

	if (role === "client") {
		const projectsIds = [...Array(getRandomIntFromInterval(1, 3))].map(() =>
			crypto.randomUUID()
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
	const tasksIds = [...Array(getRandomIntFromInterval(5, 10))].map(() =>
		crypto.randomUUID()
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
