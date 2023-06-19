/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return ["add", "edit"].includes(param);
}
