import { api } from "$common/db/utils.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ fetch }) => {
	const fetchProjects = async () => {
		const aggregate = encodeURI(
			JSON.stringify([
				{
					$project: {
						invoices: 0
					}
				}
			])
		);

		return await api({
			fetch,
			url: `/api/projects?aggregate=${aggregate}`,
			method: "GET",
			errorMessage: "Problem retrieving projects from the database."
		});
	};

	return {
		projects: fetchProjects()
	};
};
