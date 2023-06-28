import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types.js";
import { crudProjectSchema } from "$features/projects/forms/validations.js";
import { api } from "$common/db/utils.js";

export const load: PageServerLoad = (async ({ fetch, params }) => {
	let form: any;

	const fetchClients = async () => {
		const aggregate = encodeURI(
			JSON.stringify([
				{
					$lookup: {
						from: "roles",
						localField: "role",
						foreignField: "_id",
						as: "role"
					}
				},
				{ $unwind: "$role" },
				{ $match: { "role.name": "client" } },
				{
					$project: {
						birthday: 0,
						password: 0,
						avatar: 0,
						projects: 0,
						phone: 0,
						email: 0,
						createdAt: 0,
						updatedAt: 0
					}
				}
			])
		);
		return await api({
			fetch,
			url: `/api/users?aggregate=${aggregate}&limit=0`,
			method: "GET",
			errorMessage: "Problem retrieving clients from the database."
		});
	};

	if (params.hasOwnProperty("id")) {
		const project = await api({
			fetch,
			url: `/api/projects/${params.id}`,
			method: "GET",
			errorMessage: "Problem retrieving project from the database."
		});
		form = await superValidate(project, crudProjectSchema);
	} else {
		form = await superValidate(crudProjectSchema);
	}

	return {
		clients: fetchClients(),
		pageName: params.page,
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

		try {
			const { id, ...rest } = form.data;

			if (!id) {
				// Create project
				const generatedId = crypto.randomUUID();
				const project = {
					id: generatedId,
					...rest
				};

				await api({
					fetch,
					url: "/api/projects",
					method: "POST",
					data: project,
					errorMessage: "Problem inserting into database."
				});
			} else {
				// Update project
				const data = {
					filter: { id },
					update: {
						...form.data
					}
				};

				await api({
					fetch,
					url: "/api/projects",
					method: "PATCH",
					data,
					errorMessage: "Problem updating project."
				});
			}

			return { form };
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
