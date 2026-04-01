"use client";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store";
import { openNotification } from "@/store/slices";
import { bookThunks } from "@/store/thunks";
import { IBook } from "@/types";

export const Pill = ({ book }: { book: IBook }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleStatusChange = async () => {
		let updatedBook = book;
		updatedBook = {
			...updatedBook,
			book: {
				...updatedBook.book,
				status: book.book.status === "unread" ? "read" : "unread",
			},
		};
		await dispatch(bookThunks.updateBookById(updatedBook)).then(() =>
			dispatch(
				openNotification({
					message: `Status has been updated for ${book.book.title}`,
				}),
			),
		);
	};
	return (
		<div className={`pill-${book.book.status}`} onClick={handleStatusChange}>
			{book.book.status}
		</div>
	);
};
