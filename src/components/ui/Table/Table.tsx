"use client";
import { useAppSelector } from "@/hooks";
import { Table as PureTable } from "./index";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";

/** Connected Table — reads Redux loading state and delegates layout to the pure <Table> shell. */
export function Table() {
	const { isLoading } = useAppSelector((state) => state.books);

	return (
		<PureTable isLoading={isLoading}>
			<TableHeader />
			<TableBody />
		</PureTable>
	);
}
