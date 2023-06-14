import { users } from "$db/collections.js";
import { getOne } from "$db/utils.js";

export const GET = async ({ params }) => {
	const isOk: any = await getOne(users, params.id);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};
