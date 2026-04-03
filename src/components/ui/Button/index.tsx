"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const variants = {
	variant: ["primary", "secondary", "ghost", "danger"] as const,
	size: ["sm", "md", "lg"] as const,
};

export const buttonVariants = cva(
	// Base: visual-only styles — no layout (width, margin) so callers control placement
	"inline-flex items-center justify-center rounded-md font-extrabold uppercase shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary: "bg-blue-500 text-white hover:bg-gray-400",
				secondary:
					"border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white",
				ghost: "border border-gray-400 bg-transparent text-gray-400 hover:bg-gray-400/10",
				danger: "bg-red-500 text-white hover:bg-red-400",
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
