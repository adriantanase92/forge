import { env } from "$env/dynamic/private";
import mongoose, { Mongoose } from "mongoose";

const db = mongoose.connect(env.MONGODB_URI);

export async function start_mongo(): Promise<Mongoose> {
	console.log("Starting mongo...");
	return await db;
}

export default db;
