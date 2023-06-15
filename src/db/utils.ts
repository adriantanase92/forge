import { decodeAndParse, isObjectEmpty } from "$lib/utils/helpers.js";
import { fail } from "@sveltejs/kit";
import type { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";

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
			body:
				options.data && options.method !== "GET"
					? JSON.stringify(options.data)
					: null
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

export const getAll = async <T>(model: Model<T>, url: any) => {
	try {
		const search = String(url.searchParams.get("search") ?? "");
		const limit = Number(url.searchParams.get("limit") ?? 10);
		const page = Number(url.searchParams.get("page") ?? 0);
		const skip = page > 0 ? (page - 1) * limit : page * limit;
		const sort = decodeAndParse(url.searchParams.get("sort") ?? {});
		const filter = decodeAndParse(url.searchParams.get("filter") ?? {});
		const projection = decodeAndParse(url.searchParams.get("projection") ?? {});
		const populate = decodeAndParse(url.searchParams.get("populate") ?? {});

		console.log("populate: ", populate);

		const query = model
			.find({ ...filter }, { ...projection })
			.populate(!isObjectEmpty(populate) ? { ...populate } : "");
		const total = await model
			.find({ ...filter }, { ...projection })
			// .populate(!isObjectEmpty(populate) ? { ...populate } : "")
			.countDocuments()
			.exec();

		const data = await query
			.sort({ ...sort })
			.skip(skip)
			.limit(limit)
			.lean();

		return {
			success: true,
			data: {
				data,
				page,
				lastPage: Math.ceil(total / limit)
			}
		};
	} catch (error: any) {
		console.error(error.message);
	}
};

export const getOne = async <T>(model: Model<T>, id: string) => {
	try {
		const data = await model.findOne({ id });

		return {
			success: true,
			data
		};
	} catch (error: any) {
		console.error(error.message);
	}
};

export const createOne = async <T>(model: Model<T>, item: any) => {
	try {
		await model.create(item);

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error.message);
	}
};

export const createMany = async <T>(model: Model<T>, items: any[]) => {
	try {
		model.insertMany(items);

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error.message);
	}
};

export const updateOne = async <T>(
	model: Model<T>,
	data: {
		filter: FilterQuery<T>;
		update: UpdateQuery<T>;
		options?: QueryOptions<any> | null;
	}
) => {
	try {
		model.findOneAndUpdate(
			{ ...data.filter },
			{ $set: { ...data.update } },
			{ new: true }
		);

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error.message);
	}
};

export const deleteOne = async <T>(model: Model<T>, id: string) => {
	try {
		model.findOneAndDelete({ id });

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error.message);
	}
};
