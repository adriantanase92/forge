import { Role } from "$features/roles/schemas/role.schema.js";
import { getOne } from "$shared/db/utils.js";

export const GET = async ({ params }) => {
	const data = await getOne(Role, params.id);

	return new Response(JSON.stringify(data));
};
