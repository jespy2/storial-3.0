import { IBook, IUser } from "@/types";
import * as mongoDB from "mongodb";

export const collections: {
	books?: mongoDB.Collection<IBook>;
	users?: mongoDB.Collection<IUser>;
} = {};

let isConnected = false;

export async function connectToDatabase() {
	if (isConnected) return;

	const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
	await client.connect();

	const db = client.db(process.env.DB_NAME);
	collections.books = db.collection<IBook>(
		process.env.BOOK_COLLECTION_NAME as string,
	);
	collections.users = db.collection<IUser>(
		process.env.USER_COLLECTION_NAME as string,
	);

	isConnected = true;
}
