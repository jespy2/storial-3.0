import { bookThunks } from "@/store/thunks";
import { IBook, IBookState, SortDirection, SortItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { insertBook, getAllBooks, updateBookById, deleteBookById } = bookThunks;

const initialBookState: IBookState = {
	books: {
		success: false,
		data: [],
		sortInfo: {
			sortBy: "",
			sortDirection: SortDirection.NONE,
		},
	},
	isLoading: false,
	isError: false,
};

export const bookSlice = createSlice({
	name: "book",
	initialState: initialBookState,
	reducers: {
		insertBook: (state, action) => {
			state = {
				books: {
					data: [...state.books.data, action.payload.book.data],
					success: action.payload.success,
					sortInfo: {
						sortBy: state.books.sortInfo.sortBy,
						sortDirection: state.books.sortInfo.sortDirection,
					},
				},
				isLoading: false,
				isError: false,
			};
		},
		getAllBooks: (state, action) => {
			const isNewUser = action.payload?.data?.success === false;
			const userLibrary = isNewUser
				? [
						{
							username: action.payload?.data?.username,
							book: { title: "", author: "", notes: "", status: "unread" },
						} as IBook,
					]
				: state.books.data.filter(
						(book) => book.username === action.payload.username,
					);
			state.books.data = userLibrary;
			state.isLoading = false;
			state.isError = false;
		},
		deleteBookById: (state, action) => {
			const newBookData = state.books.data.filter(
				(book) => book._id !== action.payload?.book,
			);
			state.books.data = newBookData;
		},
		updateBookById: (state, action) => {
			const index = state.books.data.findIndex(
				(book) => book._id === action.payload._id,
			);
			state.books.data[index] = action.payload.book;
		},
		sortBooks: (state, action: PayloadAction<{ sortBy: SortItem }>) => {
			const { sortBy } = action.payload;
			let newSortDirection = SortDirection.ASC;
			const sortedBooks: IBook[] = state.books.data.sort(
				(a: IBook, b: IBook) => {
					const currDirection = state.books.sortInfo.sortDirection;
					const isSameSortItem = state.books.sortInfo.sortBy === sortBy;
					const reversedDirection =
						currDirection === SortDirection.ASC
							? SortDirection.DESC
							: SortDirection.ASC;
					newSortDirection = isSameSortItem
						? reversedDirection
						: SortDirection.ASC;
					if (a === undefined || b === undefined) return 0;
					const aSortItem = a.book[sortBy].toUpperCase();
					const bSortItem = b.book[sortBy].toUpperCase();
					if (aSortItem < bSortItem)
						return newSortDirection === SortDirection.ASC ? -1 : 1;
					if (aSortItem > bSortItem)
						return newSortDirection === SortDirection.ASC ? 1 : -1;
					return 0;
				},
			);
			state.books.sortInfo.sortBy = sortBy;
			state.books.sortInfo.sortDirection = newSortDirection;
			state.books.data = sortedBooks;
		},
		toggleBookStatus: (state, action: PayloadAction<{ id: string }>) => {
			const index = state.books.data.findIndex(
				(book) => book._id === action.payload.id,
			);
			state.books.data[index].book.status =
				state.books.data[index].book.status === "read" ? "unread" : "read";
		},
	},
	extraReducers: (builder) => {
		builder
			// INSERTBOOK
			.addCase(insertBook.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(insertBook.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.books = {
					data: [
						...state.books.data,
						action?.payload ? action?.payload.book : ({} as IBook),
					],
					sortInfo: {
						sortBy: state.books.sortInfo.sortBy,
						sortDirection: state.books.sortInfo.sortDirection,
					},
					success: action.payload?.response.data.success,
				};
			})
			.addCase(insertBook.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			// GETALLBOOKS
			.addCase(getAllBooks.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getAllBooks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.books.data = action.payload.data;
			})
			.addCase(getAllBooks.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			// DELETEBOOKBYID
			.addCase(deleteBookById.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(deleteBookById.fulfilled, (state, action) => {
				const newBookData = state.books.data.filter(
					(book) => book._id !== action.payload?.book,
				);
				state.isLoading = false;
				state.isError = false;
				state.books.data = newBookData;
			})
			.addCase(deleteBookById.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			// UPDATEBOOKBYID
			.addCase(updateBookById.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(updateBookById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				if (action.payload?.book) {
					const index = state.books.data.findIndex(
						(book) => book._id === action.payload?.book._id,
					);
					if (index !== -1) state.books.data[index] = action.payload.book;
				}
			})
			.addCase(updateBookById.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});
export const { reducer: bookReducer, actions: bookActions } = bookSlice;
export const { sortBooks, toggleBookStatus } = bookActions;
