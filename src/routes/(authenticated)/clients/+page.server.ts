import { api } from "$common/db/utils.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ fetch }) => {
	const fetchClients = async () => {
		const aggregate = encodeURI(
			JSON.stringify([
				{
					$lookup: {
						from: "roles",
						localField: "role",
						foreignField: "_id",
						as: "role"
					}
				},
				{ $unwind: "$role" },
				{ $match: { "role.name": "client" } },
				{
					$project: {
						birthday: 0,
						password: 0
					}
				}
			])
		);

		return await api({
			fetch,
			url: `/api/users?aggregate=${aggregate}`,
			method: "GET",
			errorMessage: "Problem retrieving users from the database."
		});
	};

	return {
		clients: fetchClients()
	};
};
