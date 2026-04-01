'use client'
import { useDispatch } from "react-redux";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

import { AppDispatch } from "@/store";
import { bookSlice } from "@/store/slices";
import { SortDirection, SortItem } from "@/types";
import { useAppSelector } from "@/hooks";

export const TableHeader = () => {
	const dispatch = useDispatch<AppDispatch>();
	const sortInfoState = useAppSelector((state) => state.books.books.sortInfo);

	const sortIconClass = (sortBy: string, icon: string) => {
		let iconClass = "";
		const isSorting = sortInfoState.sortBy === sortBy ? true : false;
		const sameSortIconDirection =
			sortInfoState.sortDirection === icon ? true : false;

		if (isSorting && sameSortIconDirection) iconClass = "singleSortIcon";
		if (isSorting && !sameSortIconDirection) iconClass = "hidden";

		return iconClass;
	};

	return (
		<>
			<thead>
				<tr>
					<th
						className='table-header'
						onClick={() =>
							dispatch(bookSlice.actions.sortBooks({ sortBy: SortItem.STATUS }))
						}
					>
						Read
						<span className='sortIcons pl-3'>
							<ChevronUpIcon
								className={sortIconClass(SortItem.STATUS, SortDirection.DESC)}
							/>
							<ChevronDownIcon
								className={sortIconClass(SortItem.STATUS, SortDirection.ASC)}
							/>
						</span>
					</th>
					<th
						className='table-header'
						onClick={() =>
							dispatch(bookSlice.actions.sortBooks({ sortBy: SortItem.TITLE }))
						}
					>
						Title
						<span className='sortIcons'>
							<ChevronUpIcon
								className={sortIconClass(SortItem.TITLE, SortDirection.DESC)}
							/>
							<ChevronDownIcon
								className={sortIconClass(SortItem.TITLE, SortDirection.ASC)}
							/>
						</span>
					</th>
					<th
						className='table-header'
						onClick={() =>
							dispatch(bookSlice.actions.sortBooks({ sortBy: SortItem.AUTHOR }))
						}
					>
						Author
						<span className='sortIcons'>
							<ChevronUpIcon
								className={sortIconClass(SortItem.AUTHOR, SortDirection.DESC)}
							/>
							<ChevronDownIcon
								className={sortIconClass(SortItem.AUTHOR, SortDirection.ASC)}
							/>
						</span>
					</th>
					<th className='table-header'>Notes</th>
					<th className='table-header-update-options'></th>
					<th className='table-header-update-options'></th>
				</tr>
			</thead>
		</>
	);
};
