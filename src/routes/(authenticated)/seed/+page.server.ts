import {
	seedPermissions,
	seedProjects,
	seedRoles,
	seedTasks,
	seedUsers
} from "$common/db/seed.js";

export const actions = {
	seedPermissions: async () => await seedPermissions(),
	seedRoles: async () => await seedRoles(),
	seedUsers: async () => await seedUsers(),
	seedProjects: async () => await seedProjects(),
	seedTasks: async () => await seedTasks()
};
