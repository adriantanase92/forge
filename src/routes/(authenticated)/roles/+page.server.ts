import { api } from "$db/utils.js";
import { fail } from "@sveltejs/kit";

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();

		const name = formData.get("name");
		const permissions = formData.get("permissions");

		if (typeof name === "string" && name?.length < 2) {
			return fail(400, {
				error: true,
				message: "Name must be at least 2 characters.",
				name
			});
		}

		const role = {
			name,
			permissions: JSON.parse(permissions as any)
		};

		return await api({
			fetch,
			url: "/api/roles",
			method: "POST",
			data: role,
			errorMessage: "Problem inserting into database."
		});
	},
	update: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		const name = formData.get("name");

		if (typeof name === "string" && name?.length < 2) {
			return fail(400, {
				error: true,
				message: "Name must be at least 2 characters.",
				name
			});
		}

		const data = {
			filter: { id },
			update: { name }
		};

		return await api({
			fetch,
			url: "/api/roles",
			method: "PATCH",
			data,
			errorMessage: "Problem updating role."
		});
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
};
