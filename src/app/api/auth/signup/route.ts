import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { IUser } from "@/types";
import { createSecretToken } from "@/lib/token";
import { findUserByEmail, insertUser } from "@/lib/db/users";

export async function POST(req: NextRequest) {
	try {
		const body: IUser = await req.json();
		const { email, username, password } = body;

		const existing = await findUserByEmail(email);
		if (existing)
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);

		const hashed = await bcrypt.hash(password, 12);
		const result = await insertUser({
			email,
			username,
			password: hashed,
			books: [],
			createdAt: new Date(),
		});

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
