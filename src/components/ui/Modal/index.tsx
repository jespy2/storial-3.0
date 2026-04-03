'use client'
import { useEffect, useRef } from 'react'
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const variants = {
	size: ["sm", "lg"] as const,
};

export const backdropVariants = cva(
	"z-10 absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center bg-gray-500/75",
);

export const modalVariants = cva(
	"z-20 h-fit flex flex-col items-center justify-center p-4 border-2 border-blue-500 rounded-md bg-slate-50 dark:bg-gray-800 shadow-lg",
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

const FOCUSABLE_SELECTORS = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface ModalProps extends VariantProps<typeof modalVariants> {
	isOpen: boolean;
	children?: React.ReactNode;
	className?: string;
	/** ID of the element that labels the dialog (matches the modal title's id). */
	labelId?: string;
	/** Called when the user presses Escape — required for the focus trap to close the modal. */
	onClose?: () => void;
}

/** Pure modal shell — backdrop + accessible dialog container. All content and close logic comes from children / the connected Modal wrapper. */
export function Modal({ isOpen, size, children, className, labelId, onClose }: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const el = dialogRef.current;
		if (!el) return;

		const getFocusables = () =>
			Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

		getFocusables()[0]?.focus();

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onClose?.();
				return;
			}

			if (e.key !== 'Tab') return;

			const focusables = getFocusables();
			if (focusables.length === 0) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];

			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className={backdropVariants()}>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelId}
				className={cn(modalVariants({ size }), className)}
			>
				{children}
			</div>
		</div>
	);
}
