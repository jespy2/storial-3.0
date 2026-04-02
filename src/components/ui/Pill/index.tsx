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
				read: "bg-brand-light border-brand text-white",
				unread: "bg-white border-brand-light text-brand-light",
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
