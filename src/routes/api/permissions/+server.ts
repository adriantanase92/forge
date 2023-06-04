import { permissions } from "$db/collections.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "$db/utils.js";

export const GET = async ({ request, url }) => {
	// ### If ever need to check if an Authorization is set in the headers of the request
	// const authHeader = request.headers.get("Authorization");
	// if (!authHeader) {
	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
	// 		status: 401
	// 	});
	// }

	let isOk: any;

	if (request.body !== null) {
		const body = await request.json();
		isOk = await getOne(permissions, body.id);
	} else {
		isOk = await getAll(permissions, url);
	}

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
	const isOk: any = await createOne(permissions, newPermission);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 201
		});
};

export const PATCH = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await updateOne(permissions, body);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};

export const DELETE = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await deleteOne(permissions, body.id);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};
