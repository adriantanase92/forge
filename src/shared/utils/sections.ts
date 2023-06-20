import {
	IconBrowserCheck,
	IconChecklist,
	IconLayoutDashboard,
	IconTableOptions,
	IconUserCog,
	IconUserStar,
	IconUsers
} from "@tabler/icons-svelte";

export const sections = [
	{
		name: "Dashboard",
		icon: {
			component: IconLayoutDashboard,
			size: 24
		},
		url: "/dashboard"
	},
	{
		name: "Clients",
		icon: {
			component: IconUserStar,
			size: 24
		},
		url: "/clients"
	},
	{
		name: "Projects",
		icon: {
			component: IconBrowserCheck,
			size: 24
		},
		url: "/projects"
	},
	{
		name: "Tasks",
		icon: {
			component: IconChecklist,
			size: 24
		},
		url: "/tasks"
	},
	{
		name: "Users",
		icon: {
			component: IconUsers,
			size: 24
		},
		url: "/users"
	},
	{
		name: "Roles",
		icon: {
			component: IconUserCog,
			size: 24
		},
		url: "/roles"
	},
	{
		name: "Permissions",
		icon: {
			component: IconTableOptions,
			size: 24
		},
		url: "/permissions"
	}
];
