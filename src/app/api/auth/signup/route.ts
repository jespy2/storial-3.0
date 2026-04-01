import { collections, connectToDatabase } from "@/lib/db";
import { createSecretToken } from "@/lib/token";
import { IUser } from "@/types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectToDatabase();
		const body: IUser = await req.json();
		const { email, username, password } = body;

		const existing = await collections.users?.findOne({ email });
		if (existing)
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);

		const hashed = await bcrypt.hash(password, 12);
		const result = await collections.users?.insertOne({
			email,
			username,
			password: hashed,
			books: [],
			createdAt: new Date(),
		} as IUser);

		const token = result
			? createSecretToken(result.insertedId.toString())
			: undefined;

		const response = NextResponse.json(
			{ success: true, message: "User created!" },
			{ status: 201 },
		);
		response.cookies.set("token", token ?? "", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 60 * 15,
		});
		return response;
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}
