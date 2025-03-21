import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "./clientLayout"; // Adjust the import path as necessary
import Providers from "./_provider/provider";
export const metadata: Metadata = {
	title: {
		default: "OnboardMe",
		template: "%s | OnboardMe",
	},
	description: "Onboarding plaform for web3 newbies",
	authors: [{ name: "Retrodevs" }],
	openGraph: {
		title: { default: "OnboardMe", template: "%s | OnboardMe" },
		description: "Onboarding plaform for web3 newbies",
		images: "",
		siteName: "OnboardMe",
		url: "",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: { default: "OnboardMe", template: "%s | OnboardMe" },
		description: "Onboarding platform for web3 newbies",
		creator: "RetroDevs",
		images: [
			"https://www.pexels.com/photo/grayscale-photo-of-bicycle-beside-seashore-103523/",
		], // Must be an absolute URL
	},
	metadataBase: new URL(
		"https://www.pexels.com/photo/grayscale-photo-of-bicycle-beside-seashore-103523/"
	),
	icons: { shortcut: ["/favicon.ico"] },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="max-w-[100vw] items-center flex justify-center h-[100vh] overflow-y-scroll">
			<body className="max-w-[100vw] w-full h-full flex flex-col items-center bg-[#130C16]">
				<Providers>
					<ClientLayout>{children}</ClientLayout>
				</Providers>
			</body>
		</html>
	);
}
