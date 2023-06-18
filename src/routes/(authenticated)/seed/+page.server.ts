import {
	seedPermissions,
	seedProjects,
	seedRoles,
	seedTasks,
	seedUsers
} from "$shared/db/seed.js";

export const actions = {
	seedPermissions: async () => await seedPermissions(),
	seedRoles: async () => await seedRoles(),
	seedUsers: async () => await seedUsers(),
	seedProjects: async () => await seedProjects(),
	seedTasks: async () => await seedTasks()
};
