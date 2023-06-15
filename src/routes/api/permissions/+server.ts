import { Permission } from "$db/schemas/Permission.js";
import { createOne, deleteOne, getAll, updateOne } from "$db/utils.js";

export const GET = async ({ url }) => {
	// ### If ever need to check if an Authorization is set in the headers of the request
	// const authHeader = request.headers.get("Authorization");
	// if (!authHeader) {
	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
	// 		status: 401
	// 	});
	// }

	const isOk: any = await getAll(Permission, url);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const newPermission = {
		id: body.id,
		name: body.name,
		read: false,
		write: false
	};
	const isOk: any = await createOne(Permission, newPermission);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 201
		});
};

export const PATCH = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await updateOne(Permission, body);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};

export const DELETE = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await deleteOne(Permission, body.id);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};
