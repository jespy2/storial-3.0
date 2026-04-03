"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { LoginForm } from "@/components/home/LoginForm";
import { Footer } from "@/components/layout/Footer/Footer";

export function HomeClient() {
	const router = useRouter();
	const { isAuthenticated } = useAppSelector((state) => state.auth.auth);

	useEffect(() => {
		if (isAuthenticated) router.push("/stories");
	}, [isAuthenticated, router]);

	return (
		<div className="relative page-container">
			<LoginForm />
			<Footer />
		</div>
	);
}
