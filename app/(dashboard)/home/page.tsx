import { Metadata } from "next";

import Dashboard from "./client";

export const metadata: Metadata = {
	title: "Home",
	openGraph: { title: "Home" },
	twitter: { title: "Home" },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function page() {
	return <Dashboard />;
}
