import { api } from "$db/utils.js";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import {
	createPermissionSchema,
	updatePermissionSchema
} from "$lib/schemas/permission.js";
import { superValidate } from "sveltekit-superforms/server";

export const load: PageServerLoad = async ({ fetch }) => {
	const fetchPermissions = async () => {
		return await api({
			fetch,
			url: "/api/permissions",
			method: "GET",
			errorMessage: "Problem retrieving permissions from the database."
		});
	};

	const form = await superValidate(createPermissionSchema);

	return {
		permissions: fetchPermissions(),
		form
	};
};

export const actions = {
	create: async ({ request, fetch }: any) => {
		const formData = await request.formData();
		const form = await superValidate(formData, createPermissionSchema);

		if (!form.valid)
			return fail(400, {
				error: true,
				message: "Invalid form"
			});

		const id = crypto.randomUUID();
		const permission = {
			id,
			...form.data
		};

		await api({
			fetch,
			url: "/api/permissions",
			method: "POST",
			data: permission,
			errorMessage: "Problem inserting into database."
		});

		return { form };
	},
	update: async ({ request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, updatePermissionSchema);

		console.log("form data on the server: ", form.data);

		if (!form.valid)
			return fail(400, {
				error: true,
				message: "Invalid form"
			});

		const id = form.data.id;
		const name = form.data.name;

		const data = {
			filter: { id },
			update: {
				name
			}
		};

		await api({
			fetch,
			url: "/api/permissions",
			method: "PATCH",
			data: data,
			errorMessage: "Problem updating permission."
		});

		return { form };
	},
	delete: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get("id");

		return await api({
			fetch,
			url: "/api/permissions",
			method: "DELETE",
			data: { id },
			errorMessage: "Problem deleting permission."
		});
	}
} satisfies Actions;
