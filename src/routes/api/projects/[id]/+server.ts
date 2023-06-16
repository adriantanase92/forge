import { Project } from "$db/schemas/Project.js";
import { getOne } from "$db/utils.js";

export const GET = async ({ params }) => {
	const data = await getOne(Project, params.id);

	return new Response(JSON.stringify(data));
};
