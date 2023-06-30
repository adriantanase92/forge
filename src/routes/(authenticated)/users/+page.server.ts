import { api } from "$common/db/utils.js";

export const load = ({ fetch }) => {
	const fetchUsers = async () => {
		return await api({
			fetch,
			url: "/api/users",
			method: "GET",
			errorMessage: "Problem retrieving users from the database."
		});
	};

	return {
		users: fetchUsers()
	};
};
