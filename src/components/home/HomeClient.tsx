"use client";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { AppDispatch } from "@/lib/store";
import { openModal } from "@/lib/store/slices";
import { ModalType } from "@/types";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function HomeClient() {
	const dispatch = useDispatch<AppDispatch>();
	const fetchBooks = useFetchBooks();

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return (
		<>
			<div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-10 mb-40'>
				<Header title='Track books to read next!' />
				<Link href='/library'>
					<button className='standard-btn'>view library</button>
				</Link>
				<Link href='/library'>
					<button
						className='standard-btn'
						onClick={() => dispatch(openModal({ type: ModalType.ADD_BOOK }))}
					>
						quick add book
					</button>
				</Link>
			</div>
			<Footer />
		</>
	);
}
