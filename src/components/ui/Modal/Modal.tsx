'use client'
import { useAppSelector } from "@/hooks";

import { ModalHeader } from "./modal-content/components/ModalHeader";

import { AddBook } from './modal-content/content/AddBook';
import { EditBook } from './modal-content/content/EditBook';

const MODAL_TITLES: Record<string, string> = {
  ADD_BOOK: 'Add a book',
  EDIT_BOOK: 'Edit book',
};

export const Modal = () => {
  const modalState = useAppSelector((state) => state.modal);
  const { modalContentType, isOpen } = modalState;

  if (!isOpen) return null;

  return (
    <div className="modal-screen-background">
      <div className="modal-container">
        <div className="modal-header">
          <ModalHeader title={MODAL_TITLES[modalContentType] ?? ''} />
        </div>
        <div className="modal-body">
          {modalContentType === 'ADD_BOOK' && <AddBook />}
          {modalContentType === 'EDIT_BOOK' && <EditBook />}
        </div>
      </div>
    </div>
  );
};
