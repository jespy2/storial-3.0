import { collections, connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { username: string } },
) {
	try {
		await connectToDatabase();
		const user = await collections.users?.findOne({
			username: params.username,
		});
		if (!user)
			return NextResponse.json({ message: "User not found" }, { status: 400 });
		return NextResponse.json({
			success: true,
			message: "User found!",
			data: user,
		});
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: String(error) },
			{ status: 500 },
		);
	}
}
