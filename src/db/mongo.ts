import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGODB_URI);

export async function start_mongo(): Promise<MongoClient> {
	console.log("Starting mongo...");
	console.log("env mongodb_uri: ", env.MONGODB_URI);
	return await client.connect();
}

export default client.db(env.MONGODB_NAME);
