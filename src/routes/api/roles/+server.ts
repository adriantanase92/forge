import { Role } from "$features/roles/schemas/role.schema.js";
import { createOne, deleteOne, getAll, updateOne } from "$common/db/utils.js";
import type { RequestEvent } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import {
	crudRoleSchema,
	roleSchema
} from "$features/roles/forms/validation.js";

export const GET = async ({ url }: RequestEvent) => {
	const isOk: any = await getAll(Role, url);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};

export const POST = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const form = await superValidate({ ...body }, roleSchema);

	if (!form.valid) {
		return new Response(JSON.stringify(form), {
			status: 400
		});
	}

	const isOk: any = await createOne(Role, { ...body });

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 201
		});
};

export const PATCH = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const form = await superValidate({ ...body.update }, crudRoleSchema);

	if (!form.valid) {
		return new Response(JSON.stringify(form), {
			status: 400
		});
	}

	const isOk: any = await updateOne(Role, { ...body });

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};

export const DELETE = async ({ request }: RequestEvent) => {
	const body = await request.json();
	const isOk: any = await deleteOne(Role, body.id);

	if (isOk.success)
		return new Response(JSON.stringify({ message: "Success" }), {
			status: 200
		});
};
