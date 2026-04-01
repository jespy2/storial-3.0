import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import apis from "@/lib/api";
import { IUser } from "@/types";

interface AuthResponseData {
	success: boolean;
}

export interface AuthThunkReturn {
	response: AxiosResponse<AuthResponseData>;
	user: IUser;
}

export interface GetUserResponseData {
	success: boolean;
	data: IUser;
}

export const authThunks = {
	createUser: createAsyncThunk<AuthThunkReturn, IUser>(
		"auth/createUser",
		async (user, { rejectWithValue }) => {
			try {
				const response =
					(await apis.createUser(user)) as AxiosResponse<AuthResponseData>;
				return { response, user };
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : "Unexpected error",
				);
			}
		},
	),

	loginUser: createAsyncThunk<AuthThunkReturn, IUser>(
		"auth/loginUser",
		async (user, { rejectWithValue }) => {
			try {
				const response =
					(await apis.loginUser(user)) as AxiosResponse<AuthResponseData>;
				return { response, user };
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : "Unexpected error",
				);
			}
		},
	),

	getUser: createAsyncThunk<GetUserResponseData, string>(
		"auth/getUser",
		async (username, { rejectWithValue }) => {
			try {
				const response = await apis.getUser(username);
				return response.data as GetUserResponseData;
			} catch (err) {
				return rejectWithValue(
					err instanceof Error ? err.message : "Unexpected error",
				);
			}
		},
	),
};
