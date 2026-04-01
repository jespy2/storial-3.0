import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { bookThunks } from "@/lib/store/thunks";

export const useFetchBooks = () => {
	const dispatch = useAppDispatch();
	const username = useAppSelector(
		(state) => state.auth.auth.userInfo.username,
	);
	const fetchBooks = useCallback(() => {
		dispatch(bookThunks.getAllBooks(username));
	}, [username, dispatch]);
	return fetchBooks;
};
