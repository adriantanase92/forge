import { Project } from "$features/projects/schemas/project.schema.js";
import { getOne } from "$shared/db/utils.js";

export const GET = async ({ params }) => {
	const data = await getOne(Project, params.id);

	return new Response(JSON.stringify(data));
};
