import { StoreProvider } from "@/components/providers/StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Storial",
	description: "Track books you'd like to read",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${inter.className} dark:bg-black dark:text-white`}>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
