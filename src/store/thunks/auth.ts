import apis from "@/lib/api";
import { IUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authThunks = {
	createUser: createAsyncThunk(
		"auth/createUser",
		async (user: IUser, { rejectWithValue }) => {
			try {
				const response = await apis.createUser(user);
				const data = {
					response: response,
					user: user,
				};
				return data;
			} catch (err) {
				if (err instanceof Error) {
					rejectWithValue(err.message);
				} else {
					rejectWithValue("An unexpected error occured");
				}
			}
		},
	),

	loginUser: createAsyncThunk(
		"auth/loginUser",
		async (user: IUser, { rejectWithValue }) => {
			try {
				const response = await apis.loginUser(user);
				const data = {
					response: response,
					user: user,
				};
				return data;
			} catch (err) {
				if (err instanceof Error) {
					rejectWithValue(err.message);
				} else {
					rejectWithValue("An unexpected error occured");
				}
			}
		},
	),

	getUser: createAsyncThunk(
		"auth/getUser",
		async (username: string, { rejectWithValue }) => {
			try {
				const response = await apis.getUser(username);
				return response.data;
			} catch (err) {
				if (err instanceof Error) {
					rejectWithValue(err.message);
				} else {
					rejectWithValue("An unexpected error occured");
				}
			}
		},
	),
};
