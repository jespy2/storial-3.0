"use client";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { StorialLogo } from "@/images";

export interface ModalHeaderProps {
	title: string;
	onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
	return (
		<div className="modal-header-topbar">
			<Image
				src={StorialLogo}
				alt="Storial Logo"
				className="header-logo"
				priority
			/>
			<h1 className="modal-header-title">{title}</h1>
			<button
				className="modal-close-btn"
				onClick={onClose}
				aria-label="Close modal"
			>
				<XMarkIcon />
			</button>
		</div>
	);
}
