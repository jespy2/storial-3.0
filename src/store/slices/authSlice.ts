import { createSlice } from "@reduxjs/toolkit";

import { IAuthState } from "@/types";
import { authThunks } from "@/store/thunks";

const { createUser, loginUser, getUser } = authThunks;

const initialAuthState: IAuthState = {
	auth: {
		isLoggedIn: undefined,
		isAuthenticated: false,
		isRegistered: true,
		userInfo: {
			email: "",
			password: "",
			username: "",
		},
	},
	isLoading: false,
	isError: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		loginUser: (state, action) => {
			state = {
				auth: {
					isLoggedIn: action.payload.success,
					isAuthenticated: action.payload.success,
					isRegistered: action.payload.success,
					userInfo: {
						email: action.payload.user.email,
						password: action.payload.user.password,
						username: action.payload.user.username,
					},
				},
				isLoading: false,
				isError: false,
			};
		},
		logoutUser: (state) => {
			state.auth.isLoggedIn = false;
			state.auth.isAuthenticated = false;
			state.auth.isRegistered = true;
			state.auth.userInfo = {
				email: "",
				password: "",
				username: "",
			};
			state.isLoading = false;
			state.isError = false;
		},
		createUser: (state, action) => {
			state = {
				auth: {
					isLoggedIn: action.payload.success,
					isAuthenticated: action.payload.success,
					isRegistered: action.payload.success,
					userInfo: {
						email: action.payload.user.email,
						password: action.payload.user.password,
						username: action.payload.user.username,
					},
				},
				isLoading: false,
				isError: false,
			};
		},
		getUser: (state, action) => {
			state.auth.isAuthenticated = action.payload.success;
			state.auth.userInfo = {
				email: action.payload.data.email,
				password: action.payload.data.password,
				username: action.payload.data.username,
			};
			state.isLoading = false;
			state.isError = false;
		},
		userIsRegistered: (state) => {
			state.auth.isRegistered = true;
		},
		userNotRegistered: (state) => {
			state.auth.isRegistered = false;
		},
		logUserOut: (state) => {
			state.auth.isLoggedIn = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// LOGINUSER
			.addCase(loginUser.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.auth = {
					isLoggedIn: action.payload?.response.data.success,
					isAuthenticated: action.payload?.response.data.success,
					isRegistered: action.payload?.response.data.success,
					userInfo: {
						email: action.payload ? action.payload?.user.email : "",
						password: action.payload ? action.payload?.user.password : "",
						username: action.payload ? action.payload?.user.username : "",
					},
				};
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.auth.isAuthenticated = false;
				state.auth.isRegistered = false;
			})
			// REGISTERUSER
			.addCase(createUser.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.auth = {
					isLoggedIn: action.payload?.response.data.success,
					isAuthenticated: action.payload?.response.data.success,
					isRegistered: action.payload?.response.data.success,
					userInfo: {
						email: action.payload ? action.payload?.user.email : "",
						password: action.payload ? action.payload?.user.password : "",
						username: action.payload ? action.payload?.user.username : "",
					},
				};
			})
			.addCase(createUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.auth.isAuthenticated = false;
				state.auth.isRegistered = false;
			})
			// GETUSER
			.addCase(getUser.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				// state.auth.isLoggedIn = action.payload.success;
				state.auth.isAuthenticated = action.payload.success;
				state.auth.userInfo = {
					email: action.payload.data.email,
					password: action.payload.data.password,
					username: action.payload.data.username,
				};
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { reducer: authReducer, actions: authActions } = authSlice;
export const { userIsRegistered, userNotRegistered, logUserOut, logoutUser } =
	authActions;
