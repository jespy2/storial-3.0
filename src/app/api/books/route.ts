import { collections, connectToDatabase } from "@/lib/db";
import { IBook } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		await connectToDatabase();
		const username = req.nextUrl.searchParams.get("username");
		if (!username)
			return NextResponse.json(
				{ success: false, error: "Username required" },
				{ status: 400 },
			);

		const data = (await collections.books
			?.find({ username })
			.toArray()) as IBook[];

		if (!data || data.length === 0) {
			const seed: IBook = {
				username,
				book: {
					_id: new ObjectId().toString(),
					title: "",
					author: "",
					notes: "",
					status: "unread",
				},
			};
			await collections.books?.insertOne(seed);
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
		await connectToDatabase();
		const body: IBook = await req.json();
		if (!body)
			return NextResponse.json(
				{ success: false, error: "Book required" },
				{ status: 400 },
			);

		const result = await collections.books?.insertOne(body);
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
