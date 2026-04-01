import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { StorialLogo } from "@/images";

export const spinnerVariants = cva(
	// Controls the outer container that sizes the ring
	"relative m-auto",
	{
		variants: {
			size: {
				sm: "w-1/4 h-1/4",
				md: "w-1/2 h-1/2",
				lg: "w-3/4 h-3/4",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	className?: string;
}

/**
 * Pure spinner — size controls the container; the ring animation and
 * ::before pseudo-element live in globals.css (.spinner-ring, .spinner-ring:before).
 */
export function Spinner({ size, className }: SpinnerProps) {
	return (
		<div className={cn(spinnerVariants({ size }), className)}>
			<div className="spinner-ring">
				<div className="spinner-contents">
					<Image
						src={StorialLogo}
						alt="Storial Logo"
						className="spinner-logo"
						priority
					/>
					<h2 className="spinner-text">...Loading</h2>
				</div>
			</div>
		</div>
	);
}
