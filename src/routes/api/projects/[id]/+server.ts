import { Project } from "$features/projects/schemas/project.schema.js";
import { getOne } from "$common/db/utils.js";

export const GET = async ({ params }) => {
	const isOk: any = await getOne(Project, params.id);

	if (isOk.success)
		return new Response(JSON.stringify(isOk.data), {
			status: 200
		});
};
