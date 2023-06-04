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

	const fetchRoles = async () => {
		return await api({
			fetch,
			url: "/api/roles",
			method: "GET",
			errorMessage: "Problem retrieving roles from the database."
		});
	};

	return {
		roles: fetchRoles(),
		permissions: fetchPermissions()
	};
};
