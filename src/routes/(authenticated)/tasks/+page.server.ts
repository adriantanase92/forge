import { api } from "$db/utils.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ fetch }) => {
	const fetchTasks = async () => {
		return await api({
			fetch,
			url: "/api/tasks",
			method: "GET",
			errorMessage: "Problem retrieving tasks from the database."
		});
	};

	return {
		tasks: fetchTasks()
	};
};
