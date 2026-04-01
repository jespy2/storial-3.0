'use client'
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/lib/store";
import { closeModal, openNotification } from "@/lib/store/slices";
import { bookThunks } from "@/lib/store/thunks";
import { useAppSelector, useFormInput } from "@/hooks";
import { IBook } from "@/types";

export const AddBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useAppSelector((state) => state.auth.auth);
  const { username } = authState.userInfo;

  const titleProps = useFormInput("");
  const authorProps = useFormInput("");
  const notesProps = useFormInput("");

  const titleField = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    titleField.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: IBook = {
      username,
      book: {
        title: titleProps.value,
        author: authorProps.value,
        notes: notesProps.value,
        status: "unread",
      },
    };
    await dispatch(bookThunks.insertBook(payload)).then(() => {
      dispatch(openNotification({ message: `${payload.book.title} has been added to your library` }));
      dispatch(closeModal());
    });
  };

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
      <input type="submit" value="Add Book" className="standard-btn" />
    </form>
  );
};