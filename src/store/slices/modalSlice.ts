import { createSlice } from "@reduxjs/toolkit";
import { IModalState, ModalType } from "@/types";

const initialModalState: IModalState = {
	isOpen: false,
	modalContentType: ModalType.NONE,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState: initialModalState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
			state.modalContentType = action.payload.type;
			state.id = action.payload.id ? action.payload.id : "";
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.modalContentType = ModalType.NONE;
		},
	},
});

export const { reducer: modalReducer, actions: modalActions } = modalSlice;
export const { openModal, closeModal } = modalActions;
