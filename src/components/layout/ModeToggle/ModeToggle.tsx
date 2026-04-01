"use client";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const ModeToggle = () => {
	const [darkMode, setDarkMode] = useState<string>(() => {
		if (typeof window === "undefined") return "light";
		return localStorage.getItem("color-theme") ?? "light";
	});

	const handleToggle = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setDarkMode(darkMode === "dark" ? "light" : "dark");
	};

	useEffect(() => {
		const opposite = darkMode === "dark" ? "light" : "dark";
		localStorage.setItem("color-theme", darkMode);
		document.documentElement.classList.remove(opposite);
		document.documentElement.classList.add(darkMode);
	}, [darkMode]);

	return (
		<div className='mode-toggle group'>
			<Tooltip message='Toggle dark/light mode' parent='mode-toggle' />
			<button onClick={handleToggle}>
				<SunIcon
					className={`mode-toggle-icon ${darkMode === "light" && "hidden"}`}
				/>
				<MoonIcon
					className={`mode-toggle-icon ${darkMode === "dark" && "hidden"}`}
				/>
			</button>
		</div>
	);
};
