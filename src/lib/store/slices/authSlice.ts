import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "@/types";
import { authThunks } from "@/lib/store/thunks";

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
		// Synchronous reducers that are called directly (not via thunks)
		initAuth: (
			state,
			action: PayloadAction<{ username: string; email: string }>,
		) => {
			state.auth.isLoggedIn = true;
			state.auth.isAuthenticated = true;
			state.auth.isRegistered = true;
			state.auth.userInfo.username = action.payload.username;
			state.auth.userInfo.email = action.payload.email;
		},
		logoutUser: (state) => {
			state.auth.isLoggedIn = false;
			state.auth.isAuthenticated = false;
			state.auth.isRegistered = true;
			state.auth.userInfo = { email: "", password: "", username: "" };
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
			// loginUser
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.auth = {
					isLoggedIn: action.payload.response.data.success,
					isAuthenticated: action.payload.response.data.success,
					isRegistered: action.payload.response.data.success,
					userInfo: {
						email: action.payload.user.email,
						password: action.payload.user.password,
						username: action.payload.user.username,
					},
				};
			})
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.auth.isAuthenticated = false;
				state.auth.isRegistered = false;
			})
			// createUser
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.auth = {
					isLoggedIn: action.payload.response.data.success,
					isAuthenticated: action.payload.response.data.success,
					isRegistered: action.payload.response.data.success,
					userInfo: {
						email: action.payload.user.email,
						password: action.payload.user.password,
						username: action.payload.user.username,
					},
				};
			})
			.addCase(createUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.auth.isAuthenticated = false;
				state.auth.isRegistered = false;
			})
			// getUser
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.auth.isAuthenticated = action.payload.success;
				state.auth.userInfo = {
					email: action.payload.data.email,
					password: action.payload.data.password,
					username: action.payload.data.username,
				};
			})
			.addCase(getUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { reducer: authReducer, actions: authActions } = authSlice;
export const {
	initAuth,
	userIsRegistered,
	userNotRegistered,
	logUserOut,
	logoutUser,
} = authActions;
