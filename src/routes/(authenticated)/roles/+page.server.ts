import { api } from "$common/db/utils.js";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms/server";
import { crudRoleSchema } from "$features/roles/forms/validation.js";

export const load: PageServerLoad = async ({ fetch }) => {
	const fetchRoles = async () => {
		return await api({
			fetch,
			url: "/api/roles",
			method: "GET",
			errorMessage: "Problem retrieving roles from the database."
		});
	};

	const form = await superValidate(crudRoleSchema);

	return {
		roles: fetchRoles(),
		form
	};
};

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudRoleSchema);

		if (!form.valid)
			return fail(400, {
				error: true,
				message: "Invalid form"
			});

		const id = crypto.randomUUID();
		const { name, permissions } = form.data;
		const role = {
			id,
			name,
			permissions: JSON.parse(permissions as any)
		};

		await api({
			fetch,
			url: "/api/roles",
			method: "POST",
			data: role,
			errorMessage: "Problem inserting into database."
		});

		return { form };
	},
	update: async ({ request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudRoleSchema);

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
			url: "/api/roles",
			method: "PATCH",
			data,
			errorMessage: "Problem updating role."
		});

		return { form };
	},
	delete: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get("id");

		return await api({
			fetch,
			url: "/api/roles",
			method: "DELETE",
			data: { id },
			errorMessage: "Problem deleting role."
		});
	}
} satisfies Actions;
