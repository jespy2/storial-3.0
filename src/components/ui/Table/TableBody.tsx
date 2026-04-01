'use client'
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Key } from "react";
import { useDispatch } from "react-redux";

import { Pill } from "@/components/ui/Pill/Pill";
import { useAppSelector } from "@/hooks";
import { AppDispatch } from "@/lib/store";
import { openAlert, openModal } from "@/lib/store/slices";
import { bookThunks } from "@/lib/store/thunks";
import { ModalType } from "@/types";

export const TableBody = () => {
	const dispatch: AppDispatch = useDispatch();
	const bookState = useAppSelector((state) => state.books.books.data);

	return (
		<>
			{bookState &&
				bookState.map((book) => (
					<tbody
						className='border-separate space-y-6 p-5 mt-10'
						key={book._id as Key}
					>
						<tr className='table-row'>
							<td className='border-r p-3'>
								<div className='pill'>
									<Pill book={book} />
								</div>
							</td>
							<td className='border-r p-3'>{book.book.title}</td>
							<td className='border-r p-3'>{book.book.author}</td>
							<td className='p-3'>{book.book.notes}</td>
							<td className='update-book-cell'>
								<PencilIcon
									className='update-book-btn'
									role='button'
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

							<td className='update-book-cell'>
								<TrashIcon
									className='update-book-btn'
									onClick={() =>
										dispatch(
											openAlert({
												message: "Are you sure you want to delete this book?",
												onConfirm: () =>
													dispatch(bookThunks.deleteBookById(book._id)),
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
};
