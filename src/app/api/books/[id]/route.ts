import { NextRequest, NextResponse } from "next/server";
import { IBook } from "@/types";
import { findBookById, updateBook, deleteBook } from "@/lib/db/books";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const book = await findBookById(params.id);
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
		const body: IBook = await req.json();
		const result = await updateBook(params.id, body);
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
		const result = await deleteBook(params.id);
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
