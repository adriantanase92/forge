import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types.js";
import { crudProjectSchema } from "$lib/form-schemas/project.js";
import { api } from "$db/utils.js";

export const load: PageServerLoad = (async ({ fetch, params }) => {
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
			url: `/api/users?aggregate=${aggregate}`,
			method: "GET",
			errorMessage: "Problem retrieving clients from the database."
		});
	};

	const project = await api({
		fetch,
		url: `/api/projects/${params.id}`,
		method: "GET",
		errorMessage: "Problem retrieving project from the database."
	});

	const form = await superValidate(project.data, crudProjectSchema);

	return {
		clients: fetchClients(),
		project: project.data,
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		// const formData = await request.formData();
		// const form = await superValidate(formData, crudProjectSchema);
		// if (!form.valid) {
		// 	return message(form, "Invalid form");
		// }
		// const { id, ...rest } = form.data;
		// const generatedId = crypto.randomUUID();
		// const project = {
		// 	id: generatedId,
		// 	...rest
		// };
		// try {
		// 	await api({
		// 		fetch,
		// 		url: "/api/projects",
		// 		method: "POST",
		// 		data: project,
		// 		errorMessage: "Problem inserting into database."
		// 	});
		// 	return { form };
		// } catch (error) {
		// 	console.error(error);
		// }
	}
} satisfies Actions;
