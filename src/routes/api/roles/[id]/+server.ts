import { Role } from "$db/schemas/Role.js";
import { getOne } from "$db/utils.js";

export const GET = async ({ params }) => {
	const data = await getOne(Role, params.id);

	return new Response(JSON.stringify(data));
};
