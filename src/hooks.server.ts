import { start_mongo } from "$db/mongo.js";

start_mongo()
	.then(() => {
		console.log("Mongo started");
	})
	.catch((e: any) => console.error(e));
