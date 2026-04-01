import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const backdropVariants = cva(
	"z-10 absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center bg-surface-overlay",
);

export const modalVariants = cva(
	"z-20 h-fit flex flex-col items-center justify-center p-4 border-2 border-brand rounded-md bg-surface-base shadow-lg dark:bg-surface-dark",
	{
		variants: {
			size: {
				sm: "w-full sm:w-1/2 lg:w-1/3",
				lg: "w-full sm:w-2/3 lg:w-1/2",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
	isOpen: boolean;
	children?: React.ReactNode;
	className?: string;
}

/** Pure modal shell — backdrop + container. All content and close logic comes from children / the connected Modal wrapper. */
export function Modal({ isOpen, size, children, className }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className={backdropVariants()}>
			<div className={cn(modalVariants({ size }), className)}>{children}</div>
		</div>
	);
}
