import { createSelector } from '@reduxjs/toolkit';
import { IBookState } from '@/types';

/** Structural subset of RootState — avoids a circular dep (store → slices → store). */
type BooksSliceState = { books: IBookState };

export const selectFilteredBooks = createSelector(
	(state: BooksSliceState) => state.books.books.data,
	(state: BooksSliceState) => state.books.searchQuery,
	(state: BooksSliceState) => state.books.activeStatusFilters,
	(data, searchQuery, activeStatusFilters) => {
		let result = data;

		if (activeStatusFilters.length > 0) {
			result = result.filter((book) =>
				activeStatusFilters.includes(book.book.status),
			);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(book) =>
					book.book.title.toLowerCase().includes(q) ||
					book.book.author.toLowerCase().includes(q),
			);
		}

		return result;
	},
);
