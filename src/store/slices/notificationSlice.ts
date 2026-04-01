import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotificationState } from "@/types";

const initialNotificationState: INotificationState = {
	isOpen: false,
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState: initialNotificationState,
	reducers: {
		openNotification: (state, action: PayloadAction<{ message: string }>) => {
			state.isOpen = true;
			state.message = action.payload.message;
		},
		closeNotification: (state) => {
			state.isOpen = false;
			state.message = "";
		},
	},
});

export const { reducer: notificationReducer, actions: notificationActions } =
	notificationSlice;
export const { openNotification, closeNotification } = notificationActions;
