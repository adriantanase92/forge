import { api } from "$db/utils.js";

export const load = ({ fetch }) => {
	const fetchPermissions = async () => {
		return await api({
			fetch,
			url: "/api/permissions",
			method: "GET",
			errorMessage: "Problem retrieving permissions from the database."
		});
	};

	return {
		permissions: fetchPermissions()
	};
};
