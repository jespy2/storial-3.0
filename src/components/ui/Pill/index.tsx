import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

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
}

export function Pill({ status, onClick, className }: PillProps) {
	return (
		<div
			role="button"
			tabIndex={0}
			aria-pressed={status === "read"}
			className={cn(pillVariants({ status }), className)}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onClick?.();
			}}
		>
			{status}
		</div>
	);
}
