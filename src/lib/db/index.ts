import * as mongoDB from "mongodb";
import { IBook, IUser } from "@/types";

export const collections: {
	books?: mongoDB.Collection<IBook>;
	users?: mongoDB.Collection<IUser>;
} = {};

// MongoClient reference — null until first successful connect.
// Using the client instance (not a boolean) means a failed connect()
// won't permanently block retries on the next request.
let client: mongoDB.MongoClient | null = null;

export async function connectToDatabase(): Promise<void> {
	if (client) return;

	const newClient = new mongoDB.MongoClient(
		process.env.DB_CONN_STRING as string,
	);
	await newClient.connect(); // throws on failure; client stays null so next request retries

	const db = newClient.db(process.env.DB_NAME);
	collections.books = db.collection<IBook>(
		process.env.BOOK_COLLECTION_NAME as string,
	);
	collections.users = db.collection<IUser>(
		process.env.USER_COLLECTION_NAME as string,
	);

	client = newClient;
}
