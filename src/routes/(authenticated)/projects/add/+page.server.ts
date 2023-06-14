import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types.js";
import { crudProjectSchema } from "$lib/schemas/project.js";
import { api } from "$db/utils.js";

export const load = (async ({ fetch }) => {
	const fetchClients = async () => {
		const projection = encodeURI(
			JSON.stringify({
				id: 1,
				firstName: 1,
				lastName: 1,
				_id: 0
			})
		);
		return await api({
			fetch,
			url: `/api/users?project=${projection}`,
			method: "GET",
			errorMessage: "Problem retrieving clients from the database."
		});
	};

	const form = await superValidate(crudProjectSchema);

	return {
		clients: fetchClients(),
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudProjectSchema);

		if (!form.valid) {
			return message(form, "Invalid form");
		}

		const { id, ...rest } = form.data;

		const generatedId = crypto.randomUUID();
		const project = {
			id: generatedId,
			...rest
		};

		try {
			await api({
				fetch,
				url: "/api/projects",
				method: "POST",
				data: project,
				errorMessage: "Problem inserting into database."
			});

			return { form };
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
