import { fail } from "@sveltejs/kit";
import type { Filter, FindOneAndUpdateOptions, UpdateFilter } from "mongodb";

export const api = async (options: {
	fetch: any;
	url: string;
	method: string;
	headers?: any;
	data?: any;
	errorMessage: string;
}) => {
	const defaultHeaders = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Authorization": "Bearer {token}"
	};

	try {
		const response = await options.fetch(options.url, {
			method: options.method,
			headers: options.headers ? options.headers : defaultHeaders,
			body: options.data && options.method !== "GET" ? JSON.stringify(options.data) : null
		});

		return await response.json();
	} catch (error) {
		console.error(error);

		return fail(400, {
			error: true,
			message: options.errorMessage
		});
	}
};

export const getAll = async (collection: any, url: any, query?: any, projection?: any) => {
	try {
		const limit = Number(url.searchParams.get("limit") ?? 10);
		const skip = Number(url.searchParams.get("skip") ?? 0);

		const data = await collection.find().limit(limit).skip(skip).toArray();

		return {
			success: true,
			data
		};
	} catch (error: any) {
		console.error(error);
	}
};

export const getOne = async (collection: any, id: string) => {
	try {
		const data = await collection.findOne({ id });

		return {
			success: true,
			data
		};
	} catch (error: any) {
		console.error(error);
	}
};

export const createOne = async (collection: any, item: any) => {
	try {
		collection.insertOne(item);

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error);
	}
};

export const createMany = async (collection: any, items: any[]) => {
	try {
		collection.insertMany(items);

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error);
	}
};

export const updateOne = async (
	collection: any,
	data: {
		filter: Filter<any>;
		update: UpdateFilter<any>;
		options?: FindOneAndUpdateOptions;
	}
) => {
	try {
		collection.findOneAndUpdate({ ...data.filter }, { $set: { ...data.update } });

		return {
			success: true
		};
	} catch (error) {
		console.error(error);
	}
};

export const deleteOne = async (collection: any, id: string) => {
	try {
		collection.findOneAndDelete({ id });

		return {
			success: true
		};
	} catch (e: any) {
		console.error(e.message);
	}
};
