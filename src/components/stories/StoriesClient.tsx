"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { initAuth } from "@/lib/store/slices/authSlice";
import { initBooks } from "@/lib/store/slices/bookSlice";
import { openModal } from "@/lib/store/slices";
import { IBook, ModalType } from "@/types";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { Table } from "@/components/ui/Table/Table";
import { Modal } from "@/components/ui/Modal/Modal";
import { Alert } from "@/components/ui/Alert/Alert";
import { Notification } from "@/components/ui/Notification/Notification";
import { Button } from "@/components/ui/Button";

interface StoriesClientProps {
	initialBooks: IBook[];
	username: string;
	email: string;
}

export function StoriesClient({
	initialBooks,
	username,
	email,
}: StoriesClientProps) {
	const dispatch = useAppDispatch();
	const { isOpen: isAlertOpen } = useAppSelector((state) => state.alert);
	const { isOpen: isNotificationOpen } = useAppSelector(
		(state) => state.notification,
	);

	useEffect(() => {
		dispatch(initAuth({ username, email }));
		dispatch(initBooks(initialBooks));
	}, [dispatch, username, email, initialBooks]);

	return (
		<div className="relative page-container">
			<div className="flex flex-col items-center w-full">
				<Header title="My Library" />
				<main className="main-content">
					<div className="table-actions">
						<Button
							variant="primary"
							onClick={() =>
								dispatch(openModal({ type: ModalType.ADD_BOOK }))
							}
						>
							Add Book
						</Button>
					</div>
					<Table />
				</main>
			</div>
			<Modal />
			{isAlertOpen && <Alert />}
			{isNotificationOpen && <Notification />}
			<Footer />
		</div>
	);
}
