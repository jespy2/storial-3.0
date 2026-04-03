import { ObjectId } from "mongodb";
import { IBook } from "@/types";
import { collections, connectToDatabase } from "./index";

export async function findBooksByUsername(username: string): Promise<IBook[]> {
	await connectToDatabase();
	return (await collections.books?.find({ username }).toArray()) ?? [];
}

export async function findBookById(id: string): Promise<IBook | null> {
	await connectToDatabase();
	return (
		(await collections.books?.findOne({ _id: new ObjectId(id) as unknown as string })) ?? null
	);
}

export async function insertBook(book: IBook) {
	await connectToDatabase();
	return collections.books?.insertOne(book);
}

export async function updateBook(id: string, book: IBook) {
	await connectToDatabase();
	// Omit top-level _id from $set — MongoDB rejects mutations to the immutable _id field
	const { _id, ...fields } = book;
	return collections.books?.updateOne(
		{ _id: new ObjectId(id) as unknown as string },
		{ $set: fields },
	);
}

export async function deleteBook(id: string) {
	await connectToDatabase();
	return collections.books?.deleteOne({ _id: new ObjectId(id) as unknown as string });
}
