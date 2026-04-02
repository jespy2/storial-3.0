import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/token";
import { findUserById } from "@/lib/db/users";
import { findBooksByUsername } from "@/lib/db/books";
import { IBook } from "@/types";
import { StoriesClient } from "@/components/stories/StoriesClient";

export default async function StoriesPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	if (!token) redirect("/");

	const payload = verifyToken(token);
	if (!payload) redirect("/");

	const user = await findUserById(payload.id);
	if (!user) redirect("/");

	const rawBooks = await findBooksByUsername(user.username);
	const books: IBook[] = rawBooks.map(({ _id, ...rest }) => ({
		...rest,
		_id: _id?.toString(),
	}));

	return (
		<StoriesClient
			initialBooks={books}
			username={user.username}
			email={user.email}
		/>
	);
}
