import { roles } from "$db/collections.js";
import { getOne } from "$db/utils.js";

export const GET = async ({ params }) => {
	const data = await getOne(roles, params.id);

	return new Response(JSON.stringify(data));
};
