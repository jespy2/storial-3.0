import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlertState } from "@/types";

const initialAlertState: IAlertState = {
	isOpen: false,
	message: "",
	onConfirm: () => {},
	notificationMessage: "",
};

export const alertSlice = createSlice({
	name: "alert",
	initialState: initialAlertState,
	reducers: {
		openAlert: (
			state,
			action: PayloadAction<{
				message: string;
				onConfirm: () => void;
				notificationMessage: string;
			}>,
		) => {
			state.isOpen = true;
			state.message = action.payload.message;
			state.onConfirm = action.payload.onConfirm;
			state.notificationMessage = action.payload.notificationMessage;
		},
		closeAlert: (state) => {
			state.isOpen = false;
			state.message = "";
			state.onConfirm = () => {};
			state.notificationMessage = "";
		},
	},
});

export const { reducer: alertReducer, actions: alertActions } = alertSlice;
export const { openAlert, closeAlert } = alertActions;
