import { IUser } from "@/types";
import { collections, connectToDatabase } from "./index";

export async function findUserByEmail(email: string) {
	await connectToDatabase();
	return (await collections.users?.findOne({ email })) ?? null;
}

export async function findUserByUsername(username: string) {
	await connectToDatabase();
	return (await collections.users?.findOne({ username })) ?? null;
}

export async function insertUser(user: IUser) {
	await connectToDatabase();
	return collections.users?.insertOne(user);
}
