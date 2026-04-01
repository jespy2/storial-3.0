"use client";
import Image from "next/image";
import { StorialLogo } from "@/images";

export const Spinner = () => {
	return (
		<div className='spinner-ring'>
			<div className='spinner-contents'>
        <Image
          src={StorialLogo}
          alt='Storial Logo'
          className='spinner-logo'
          priority
        />
				<h2 className='spinner-text'>...Loading</h2>
			</div>
		</div>
	);
};
