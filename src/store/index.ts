import { configureStore } from "@reduxjs/toolkit";
import {
	alertReducer,
	authReducer,
	bookReducer,
	modalReducer,
	notificationReducer,
} from "./slices";

export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
