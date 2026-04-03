import { configureStore } from "@reduxjs/toolkit";
import {
	alertReducer,
	authReducer,
	bookReducer,
	modalReducer,
	notificationReducer,
} from "./slices";

export const makeStore = () =>
	configureStore({
		reducer: {
			alert: alertReducer,
			auth: authReducer,
			books: bookReducer,
			modal: modalReducer,
			notification: notificationReducer,
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
	});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
