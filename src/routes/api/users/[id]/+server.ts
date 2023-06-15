import { User } from "$db/schemas/User.js";
import { getOne } from "$db/utils.js";

export const GET = async ({ params }) => {
	const isOk: any = await getOne(User, params.id);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};
