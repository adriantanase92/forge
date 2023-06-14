import { projects } from "$db/collections.js";
import { createOne, deleteOne, getAll, updateOne } from "$db/utils.js";
import { projectSchema } from "$lib/schemas/project.js";
import { superValidate } from "sveltekit-superforms/server";

export const GET = async ({ url }) => {
	// ### If ever need to check if an Authorization is set in the headers of the request
	// const authHeader = request.headers.get("Authorization");
	// if (!authHeader) {
	// 	return new Response(JSON.stringify({ message: "Invalid credentials" }), {
	// 		status: 401
	// 	});
	// }

	const isOk: any = await getAll(projects, url);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};

export const POST = async ({ request }) => {
	const body = await request.json();
	const form = await superValidate({ ...body }, projectSchema);

	if (!form.valid) {
		return new Response(JSON.stringify(form), {
			status: 400
		});
	}

	const isOk: any = await createOne(projects, { ...body });

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 201
		});
};

export const PATCH = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await updateOne(projects, body);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};

export const DELETE = async ({ request }) => {
	const body = await request.json();
	const isOk: any = await deleteOne(projects, body.id);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};
