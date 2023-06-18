import { User } from "$features/users/schemas/user.schemas.js";
import { getAll } from "$shared/db/utils.js";
import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ url }: RequestEvent) => {
	// ### If ever need to check if an Authorization is set in the headers of the request
	// const authHeader = request.headers.get("Authorization");
	// if (!authHeader) {
	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
	// 		status: 401
	// 	});
	// }

	const isOk: any = await getAll(User, url);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};

// export const POST = async ({ request }) => {
// 	const body = await request.json();

// 	console.log(body);

// 	return new Response(JSON.stringify({ message: "Success" }), { status: 201 });
// };
