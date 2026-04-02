"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const variants = {
	variant: ["primary", "secondary", "ghost", "danger"] as const,
	size: ["sm", "md", "lg"] as const,
};

export const buttonVariants = cva(
	// Base: visual-only styles — no layout (width, margin) so callers control placement
	"inline-flex items-center justify-center rounded-md font-extrabold uppercase shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary: "bg-brand text-white hover:bg-neutral",
				secondary:
					"border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
				ghost: "border border-neutral bg-transparent text-neutral hover:bg-neutral/10",
				danger: "bg-danger text-white hover:bg-danger-hover",
			},
			size: {
				sm: "text-xs px-2 py-1.5",
				md: "text-sm px-4 py-2",
				lg: "text-sm px-5 py-3",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		/>
	);
}
