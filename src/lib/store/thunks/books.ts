import { createAsyncThunk } from "@reduxjs/toolkit";
import apis from "@/lib/api";
import { IBook } from "@/types";

const unexpectedError = "Unexpected error";

export const bookThunks = {
	insertBook: createAsyncThunk(
		"book/insertBook",
		async (book: IBook, { rejectWithValue }) => {
			try {
				const response = await apis.insertBook(book);
				return { response, book };
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : unexpectedError,
				);
			}
		},
	),

	getAllBooks: createAsyncThunk(
		"book/getAllBooks",
		async (username: string, { rejectWithValue }) => {
			try {
				const response = await apis.getAllBooks(username);
				return response.data;
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : unexpectedError,
				);
			}
		},
	),

	updateBookById: createAsyncThunk(
		"book/updateBookById",
		async (book: IBook & { _id: string }, { rejectWithValue }) => {
			try {
				const response = await apis.updateBookById(book._id, book);
				return { response, book };
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : unexpectedError,
				);
			}
		},
	),

	deleteBookById: createAsyncThunk(
		"book/deleteBookById",
		async (id: string, { rejectWithValue }) => {
			try {
				const response = await apis.deleteBookById(id);
				return { response, book: id };
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : unexpectedError,
				);
			}
		},
	),

	getBookById: createAsyncThunk(
		"book/getBookById",
		async (id: string, { rejectWithValue }) => {
			try {
				const response = await apis.getBookById(id);
				return response.data;
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : unexpectedError,
				);
			}
		},
	),
};
