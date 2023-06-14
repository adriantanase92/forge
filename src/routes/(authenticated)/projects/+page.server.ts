import { api } from "$db/utils.js";

export const load = ({ fetch }) => {
	const fetchProjects = async () => {
		return await api({
			fetch,
			url: "/api/projects",
			method: "GET",
			errorMessage: "Problem retrieving projects from the database."
		});
	};

	return {
		projects: fetchProjects()
	};
};
