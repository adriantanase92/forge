import { users } from "$db/collections.js";

export const GET = async ({ request, url }) => {
	// ### If ever need to check if an Authorization is set in the headers of the request
	// const authHeader = request.headers.get("Authorization");
	// if (!authHeader) {
	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
	// 		status: 401
	// 	});
	// }

	const limit = Number(url.searchParams.get("limit") ?? 10);
	const skip = Number(url.searchParams.get("skip") ?? 0);

	const data = await users.find().toArray();

	return new Response(JSON.stringify(data), { status: 200 });
};

// export const POST = async ({ request }) => {
// 	const body = await request.json();
// 	// ### If ever need to check if an Authorization is set in the headers of the request
// 	// const authHeader = request.headers.get("Authorization");
// 	// if (!authHeader) {
// 	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
// 	// 		status: 401
// 	// 	});
// 	// }

// 	console.log(body);

// 	return new Response(JSON.stringify({ message: "Success" }), { status: 201 });
// };
