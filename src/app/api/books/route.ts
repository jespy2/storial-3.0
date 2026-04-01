import { NextRequest, NextResponse } from "next/server";
import { IBook } from "@/types";
import { findBooksByUsername, insertBook } from "@/lib/db/books";

export async function GET(req: NextRequest) {
	try {
		const username = req.nextUrl.searchParams.get("username");
		if (!username)
			return NextResponse.json(
				{ success: false, error: "Username required" },
				{ status: 400 },
			);

		const data = await findBooksByUsername(username);

		// New user with no books — seed one empty record so the UI has something to render
		if (data.length === 0) {
			const seed: IBook = {
				username,
				book: { title: "", author: "", notes: "", status: "unread" },
			};
			await insertBook(seed);
			return NextResponse.json({ success: true, data: [seed] });
		}

		return NextResponse.json({ success: true, data });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body: IBook = await req.json();
		if (!body)
			return NextResponse.json(
				{ success: false, error: "Book required" },
				{ status: 400 },
			);

		const result = await insertBook(body);
		return NextResponse.json(
			{ success: true, id: result?.insertedId, message: "Book created!" },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}
