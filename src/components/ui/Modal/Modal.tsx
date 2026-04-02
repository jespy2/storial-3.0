"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { closeModal } from "@/lib/store/slices";
import { Modal as PureModal } from "./index";
import { ModalHeader } from "./modal-content/components/ModalHeader";
import { AddBook } from "./modal-content/content/AddBook";
import { EditBook } from "./modal-content/content/EditBook";

const MODAL_TITLES: Record<string, string> = {
	ADD_BOOK: "Add a book",
	EDIT_BOOK: "Edit book",
};

const TITLE_ID = "modal-title";

/** Connected Modal — reads Redux state and delegates rendering to the pure <Modal> shell. */
export function Modal() {
	const dispatch = useAppDispatch();
	const { modalContentType, isOpen } = useAppSelector((state) => state.modal);
	const handleClose = () => dispatch(closeModal());

	return (
		<PureModal isOpen={isOpen} labelId={TITLE_ID} onClose={handleClose}>
			<div className="modal-header">
				<ModalHeader
					title={MODAL_TITLES[modalContentType] ?? ""}
					onClose={handleClose}
					titleId={TITLE_ID}
				/>
			</div>
			<div className="modal-body">
				{modalContentType === "ADD_BOOK" && <AddBook />}
				{modalContentType === "EDIT_BOOK" && <EditBook />}
			</div>
		</PureModal>
	);
}
