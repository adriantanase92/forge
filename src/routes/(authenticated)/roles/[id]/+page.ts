import { api } from "$common/db/utils.js";

export const load = ({ params, fetch }) => {
	const fetchRole = async (id: string) => {
		return await api({
			fetch,
			url: `/api/roles/${id}`,
			method: "GET",
			errorMessage: "Problem retrieving role from the database."
		});
	};

	return {
		role: fetchRole(params.id)
	};
};
