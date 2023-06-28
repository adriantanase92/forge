import { Permission } from "$features/permissions/schemas/permission.schema.js";
import { createOne, deleteOne, getAll, updateOne } from "$common/db/utils.js";
import type { RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import {
	crudPermissionSchema,
	permissionSchema
} from "$features/permissions/forms/validations.js";

export const GET = async ({ url, params }: RequestEvent) => {
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

export const POST = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const isOk: any = await createOne(Permission, { ...body });

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 201
		});
};

export const PATCH = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const form = await superValidate({ ...body.update }, crudPermissionSchema);

	if (!form.valid) {
		return new Response(JSON.stringify(form), {
			status: 400
		});
	}

	const isOk: any = await updateOne(Permission, { ...body });

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};

export const DELETE = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const isOk: any = await deleteOne(Permission, body.id);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};
