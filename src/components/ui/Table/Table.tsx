"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchQuery, toggleStatusFilter } from "@/lib/store/slices";
import { selectFilteredBooks } from "@/lib/store/selectors/books";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatusFilter } from "@/components/ui/StatusFilter";
import { Table as PureTable } from "./index";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

/** Connected Table — reads Redux state and renders search/filter controls above the pure table shell. */
export function Table() {
	const dispatch = useAppDispatch();
	const { isLoading, activeStatusFilters } = useAppSelector((state) => state.books);
	const filteredCount = useAppSelector((state) => selectFilteredBooks(state).length);

	return (
		<>
			<p
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className="sr-only"
			>
				{filteredCount} {filteredCount === 1 ? "story" : "stories"} found
			</p>
			<div className="flex flex-col sm:flex-row gap-3 px-4 py-3">
				<SearchInput
					onSearch={(q) => dispatch(setSearchQuery(q))}
					className="flex-1"
				/>
				<StatusFilter
					activeFilters={activeStatusFilters}
					onToggle={(status) => dispatch(toggleStatusFilter(status))}
				/>
			</div>
			<PureTable isLoading={isLoading}>
				<TableHeader />
				<TableBody />
			</PureTable>
		</>
	);
}
