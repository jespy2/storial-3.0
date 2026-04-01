'use client'
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/lib/store";
import { closeModal, openNotification } from "@/lib/store/slices";
import { bookThunks } from "@/lib/store/thunks";
import { useAppSelector, useFormInput } from "@/hooks";
import { IBook } from "@/types";

export const EditBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useAppSelector((state) => state.modal);
  const booksState = useAppSelector((state) => state.books.books.data);
  const { id } = modalState;

  const book = booksState.find((b) => b._id === id);

  const titleProps = useFormInput(book?.book.title ?? "");
  const authorProps = useFormInput(book?.book.author ?? "");
  const notesProps = useFormInput(book?.book.notes ?? "");

  const titleField = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    titleField.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    const payload: IBook = {
      username: book.username,
      _id: book._id,
      book: {
        title: titleProps.value,
        author: authorProps.value,
        notes: notesProps.value,
        status: book.book.status,
      },
    };

    await dispatch(bookThunks.updateBookById(payload)).then(() => {
      dispatch(openNotification({ message: `${payload.book.title} has been updated` }));
      dispatch(closeModal());
    });
  };

  if (!book) return <p className="text-gray-400">Book not found.</p>;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        ref={titleField}
        id="title"
        className="textfield focus:outline-none focus:shadow-outline"
        required
        {...titleProps}
      />
      <label className="form-label" htmlFor="author">Author</label>
      <input
        type="text"
        name="author"
        id="author"
        className="textfield focus:outline-none focus:shadow-outline"
        required
        {...authorProps}
      />
      <label className="form-label" htmlFor="notes">Notes</label>
      <textarea
        name="notes"
        id="notes"
        className="textfield focus:outline-none focus:shadow-outline h-28"
        required
        {...notesProps}
      />
      <input type="submit" value="Save Changes" className="standard-btn" />
    </form>
  );
};