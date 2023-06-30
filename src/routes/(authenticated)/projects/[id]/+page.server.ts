import { api } from "$common/db/utils.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ fetch, params }) => {
	const fetchProject = async (id: string) => {
		return await api({
			fetch,
			url: `/api/projects/${id}`,
			method: "GET",
			errorMessage: "Problem retrieving project from the database."
		});
	};

	return {
		project: fetchProject(params.id)
	};
}) satisfies PageServerLoad;
