import { api } from "$db/utils.js";
import { fail } from "@sveltejs/kit";

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();
		const name = formData.get("name");
		const id = crypto.randomUUID();

		const permission = {
			id,
			name
		};

		return await api({
			fetch,
			url: "/api/permissions",
			method: "POST",
			data: permission,
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
			update: {
				name
			}
		};

		return await api({
			fetch,
			url: "/api/permissions",
			method: "PATCH",
			data: data,
			errorMessage: "Problem updating permission."
		});
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
};
