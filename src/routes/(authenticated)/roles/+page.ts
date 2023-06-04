import { api } from "$db/utils.js";

export const load = ({ fetch }) => {
	const fetchRoles = async () => {
		return await api({
			fetch,
			url: "/api/roles",
			method: "GET",
			errorMessage: "Problem retrieving roles from the database."
		});
	};

	return {
		roles: fetchRoles()
	};
};
