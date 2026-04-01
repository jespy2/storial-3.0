import { IBook, IUser } from "@/types";
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const insertBook = (payload: IBook) => api.post("/books", payload);
export const getAllBooks = (username: string) =>
	api.get(`/books?username=${username}`);
export const updateBookById = (id: string, payload: IBook) =>
	api.put(`/books/${id}`, payload);
export const deleteBookById = (id: string) => api.delete(`/books/${id}`);
export const getBookById = (id: string) => api.get(`/books/${id}`);

export const createUser = (payload: IUser) => api.post("/auth/signup", payload);
export const loginUser = (payload: IUser) => api.post("/auth/login", payload);
export const getUser = (username: string) => api.get(`/auth/${username}`);

const apis = {
	insertBook,
	getAllBooks,
	updateBookById,
	deleteBookById,
	getBookById,
	createUser,
	loginUser,
	getUser,
};
export default apis;
