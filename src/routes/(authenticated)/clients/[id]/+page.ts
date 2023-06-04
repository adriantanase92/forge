export const load = ({ params, fetch }) => {
	const fetchPost = async (id: any) => {
		const res = await fetch(`/api-routes-and-endpoints/api/posts/${id}`);
		const data = await res.json();
		return data;
	};

	return {
		post: fetchPost(params.postId)
	};
};
