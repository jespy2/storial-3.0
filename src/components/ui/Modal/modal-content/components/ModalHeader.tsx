"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/store";
import { closeModal } from "@/store/slices";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { StorialLogo } from "@/images";

export const ModalHeader = ({ title }: { title: string }) => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			<div className='modal-header-topbar'>				
        <Image
          src={StorialLogo}
          alt='Storial Logo'
          className='header-logo'
          priority
        />
				<h1 className='modal-header-title'>{title}</h1>
				<button
					className='modal-close-btn'
					onClick={() => dispatch(closeModal())}
				>
					<XMarkIcon />
				</button>
			</div>
		</>
	);
};
