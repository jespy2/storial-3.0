import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookThunks } from '@/store/thunks';
import { AppDispatch, RootState } from '@/store';

export const useFetchBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector((state: RootState) => state.auth.auth.userInfo.username);
  const fetchBooks = useCallback(() => {
  dispatch(bookThunks.getAllBooks(username));
  }, [username, dispatch]);
  return fetchBooks;
}