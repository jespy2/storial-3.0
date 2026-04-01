"use client";
import Image from "next/image";
import { Logout, ModeToggle } from "@/components/layout";
import { useAppSelector } from "@/hooks";

import { StorialLogo } from "@/images";

export const Header = ({ title }: { title: string }) => {
	const loggedInState = useAppSelector(
		(state) => state.auth.auth.isAuthenticated,
	);
	return (
		<>
			{loggedInState && <Logout />}
			<ModeToggle />
			<div className='header-container'>
				<Image
					src={StorialLogo}
					alt='Storial Logo'
					className='header-logo'
					priority
				/>
				<h1 className='header-title'>{title}</h1>
			</div>
		</>
	);
};
