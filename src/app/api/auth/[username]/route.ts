import { NextRequest, NextResponse } from "next/server";
import { findUserByUsername } from "@/lib/db/users";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { username: string } },
) {
	try {
		const user = await findUserByUsername(params.username);
		if (!user)
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 400 },
			);
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
