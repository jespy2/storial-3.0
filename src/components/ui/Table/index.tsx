import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const tableVariants = cva(
	"flex flex-col max-w-full overflow-x-auto rounded-md shadow-lg dark:border dark:border-slate-300 dark:shadow-md dark:shadow-slate-500",
	{
		variants: {
			height: {
				full: "h-3/4",
				auto: "h-auto",
			},
		},
		defaultVariants: {
			height: "full",
		},
	},
);

export interface TableProps extends VariantProps<typeof tableVariants> {
	isLoading?: boolean;
	loadingText?: string;
	children?: React.ReactNode;
	className?: string;
}

/** Pure table shell — handles responsive wrapper and loading state. Pass <TableHeader> and <TableBody> as children. */
export function Table({
	isLoading,
	loadingText = "Collecting your books from the shelves...",
	height,
	children,
	className,
}: TableProps) {
	return (
		<div className={cn(tableVariants({ height }), className)}>
			<div className="inline-block min-w-full">
				<div className="overflow-x-auto">
					{isLoading ? (
						<div>{loadingText}</div>
					) : (
						<table className="relative min-w-full table">{children}</table>
					)}
				</div>
			</div>
		</div>
	);
}
