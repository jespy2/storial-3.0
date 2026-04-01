import { collections, connectToDatabase } from "@/lib/db";
import { IBook } from "@/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await connectToDatabase();
		const book = await collections.books?.findOne({
			_id: new ObjectId(params.id),
		});
		if (!book)
			return NextResponse.json(
				{ success: false, error: "Book not found" },
				{ status: 404 },
			);
		return NextResponse.json({ success: true, data: book });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await connectToDatabase();
		const body: IBook = await req.json();
		const result = await collections.books?.updateOne(
			{ _id: new ObjectId(params.id) },
			{ $set: body },
		);
		if (!result?.matchedCount)
			return NextResponse.json(
				{ success: false, message: "Not found" },
				{ status: 404 },
			);
		return NextResponse.json({
			success: true,
			message: `${body.book.title} updated!`,
		});
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await connectToDatabase();
		const result = await collections.books?.deleteOne({
			_id: new ObjectId(params.id),
		});
		if (!result?.deletedCount)
			return NextResponse.json(
				{ success: false, message: "Not found" },
				{ status: 404 },
			);
		return NextResponse.json({ success: true, message: "Book deleted" });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}
