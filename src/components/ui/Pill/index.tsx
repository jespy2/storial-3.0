import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const variants = {
	status: ["read", "unread"] as const,
};

export const pillVariants = cva(
	"rounded-lg border shadow-md px-2 py-1 text-center font-bold text-xs md:text-sm cursor-pointer select-none transition-colors",
	{
		variants: {
			status: {
				read: "bg-blue-300 border-blue-500 text-white",
				unread: "bg-blue-50 dark:bg-gray-700 border-blue-300 text-blue-500 dark:text-blue-300",
			},
		},
		defaultVariants: {
			status: "unread",
		},
	},
);

export interface PillProps extends VariantProps<typeof pillVariants> {
	onClick?: () => void;
	className?: string;
	/** Accessible name when there is no visible text (e.g. icon-only usage). */
	"aria-label"?: string;
}

export function Pill({ status, onClick, className, "aria-label": ariaLabel }: PillProps) {
	return (
		<div
			role="button"
			tabIndex={0}
			aria-pressed={status === "read"}
			aria-label={ariaLabel}
			className={cn(pillVariants({ status }), className)}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onClick?.();
				}
			}}
		>
			{status}
		</div>
	);
}
