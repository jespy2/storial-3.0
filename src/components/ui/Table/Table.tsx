'use client'
import { useAppSelector } from "@/hooks";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

export const Table = () => {
	const booksState = useAppSelector((state) => state.books);
	const { isLoading } = booksState;

	return (
		<div className='flex flex-col max-w-full h-3/4 overflow-x-auto rounded-md shadow-lg dark:border dark:border-slate-300 dark:shadow-md dark:shadow-slate-500'>
				<div className="inline-block min-w-full ">
					<div className="overflow-x-auto">
					{isLoading && <div>Collecting your books from the shelves...</div>}
					{!isLoading && (
						<table className='relative min-w-full table '>
							<TableHeader />
							<TableBody />
						</table>
					)}
					</div>
				</div>
		</div>
	);
};
