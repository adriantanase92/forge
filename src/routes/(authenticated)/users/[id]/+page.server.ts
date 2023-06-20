import { api } from "$shared/db/utils.js";

export const load = ({ fetch, params }) => {
	const fetchUser = async (id: string) => {
		return await api({
			fetch,
			url: `/api/users/${id}`,
			method: "GET",
			errorMessage: "Problem retrieving user from the database."
		});
	};

	return {
		user: fetchUser(params.id)
	};
};
