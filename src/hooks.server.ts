import { start_mongo } from "$shared/db/mongo.js";

start_mongo()
	.then(() => {
		console.log("Mongo started");
	})
	.catch((e: any) => console.error(e));
