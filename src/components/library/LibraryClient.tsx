"use client";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { Alert } from "@/components/ui/Alert/Alert";
import { Modal } from "@/components/ui/Modal/Modal";
import { Notification } from "@/components/ui/Notification/Notification";
import { Table } from "@/components/ui/Table/Table";
import { useAppSelector } from "@/hooks/useAppSelector";
import { AppDispatch } from "@/store";
import { closeModal, openModal } from "@/store/slices";
import { ModalType } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function LibraryClient() {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const authState = useAppSelector((state) => state.auth.auth);
	const booksState = useAppSelector((state) => state.books);
	const modalState = useAppSelector((state) => state.modal);
	const alertState = useAppSelector((state) => state.alert);
	const notificationState = useAppSelector((state) => state.notification);

	useEffect(() => {
		closeModal();
	}, [booksState.books.data]);
	useEffect(() => {
		if (!authState.isAuthenticated) router.push("/");
	});

	return (
		<div className='page-container'>
			{authState.isAuthenticated && (
				<>
					<Header title='Your library' />
					{booksState.isLoading && <div>Loading...</div>}
					{!booksState.isLoading && <Table />}
					<section className='flex flex-col sm:flex-row items-center justify-center w-full flex-1 mb-6 md:px-20 text-center md:pb-20 lg:-mt-10'>
						<Link href='/'>
							<button className='standard-btn'>home</button>
						</Link>
						<button
							className='standard-btn'
							onClick={() => dispatch(openModal({ type: ModalType.ADD_BOOK }))}
						>
							quick add book
						</button>
					</section>
					{notificationState.isOpen && <Notification />}
					{alertState.isOpen && <Alert />}
					{modalState.isOpen && <Modal />}
					<Footer />
				</>
			)}
		</div>
	);
}
