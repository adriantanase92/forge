import { Task } from "$db/schemas/Task.js";
import { getAll } from "$db/utils.js";
import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ url }: RequestEvent) => {
	const isOk: any = await getAll(Task, url);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};
