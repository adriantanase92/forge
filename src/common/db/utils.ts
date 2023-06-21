import { decodeAndParse } from "$common/utils/helpers.js";
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
		const page = Number(url.searchParams.get("page") ?? 0);
		const limitValueFromParams = url.searchParams.get("limit");
		const sort = decodeAndParse(url.searchParams.get("sort")) ?? {
			createdAt: -1
		};
		const aggregate = decodeAndParse(url.searchParams.get("aggregate")) ?? [
			{ $match: { _id: { $exists: true } } }
		];

		const options = [];

		if (limitValueFromParams !== "0") {
			const limit = Number(limitValueFromParams ?? 10);
			const skip = page > 0 ? (page - 1) * limit : page * limit;

			options.push(
				{
					$skip: skip
				},
				{
					$limit: limit
				}
			);
		}

		const data = await model.aggregate([
			...aggregate,
			{
				$facet: {
					items: [
						{
							$sort: {
								...sort
							}
						},
						...options
					],
					total: [{ $count: "total" }]
				}
			}
		]);

		const dataWithPagination = {
			items: data[0].items,
			pagination: {
				total: data[0].total[0].total,
				page
			}
		};

		return {
			success: true,
			data: dataWithPagination
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
		await model.insertMany(items);

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
		await model.updateOne(
			{ ...data.filter },
			{ $set: { ...data.update } },
			data.options ?? null
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
		await model.findOneAndDelete({ id });

		return {
			success: true
		};
	} catch (error: any) {
		console.error(error.message);
	}
};
