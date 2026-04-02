"use client";
import { Key } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { Pill } from "@/components/ui/Pill";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { openAlert, openModal, openNotification } from "@/lib/store/slices";
import { selectFilteredBooks } from "@/lib/store/selectors/books";
import { bookThunks } from "@/lib/store/thunks";
import { IBook, ModalType } from "@/types";

export function TableBody() {
	const dispatch = useAppDispatch();
	const books = useAppSelector(selectFilteredBooks);

	const handleStatusChange = async (book: IBook) => {
		if (!book._id) return;
		const updated: IBook & { _id: string } = {
			...book,
			_id: book._id,
			book: {
				...book.book,
				status: book.book.status === "unread" ? "read" : "unread",
			},
		};
		await dispatch(bookThunks.updateBookById(updated));
		dispatch(
			openNotification({
				message: `Status updated for ${book.book.title}`,
			}),
		);
	};

	return (
		<>
			{books.map((book) => (
				<tbody
					className="border-separate space-y-6 p-5 mt-10"
					key={book._id as Key}
				>
					<tr className="table-row">
						<td className="border-r p-3">
							<Pill
								status={book.book.status}
								onClick={() => handleStatusChange(book)}
							/>
						</td>
						<td className="border-r p-3">{book.book.title}</td>
						<td className="border-r p-3">{book.book.author}</td>
						<td className="p-3">{book.book.notes}</td>
						<td className="update-book-cell">
							<PencilIcon
								className="update-book-btn"
								role="button"
								onClick={() =>
									dispatch(
										openModal({
											type: ModalType.EDIT_BOOK,
											id: book._id as string,
										}),
									)
								}
							/>
						</td>
						<td className="update-book-cell">
							<TrashIcon
								className="update-book-btn"
								onClick={() =>
									dispatch(
										openAlert({
											message: "Are you sure you want to delete this book?",
											onConfirm: () =>
												dispatch(bookThunks.deleteBookById(book._id as string)),
											notificationMessage: `${book.book.title} has been removed from your library`,
										}),
									)
								}
							/>
						</td>
					</tr>
				</tbody>
			))}
		</>
	);
}
