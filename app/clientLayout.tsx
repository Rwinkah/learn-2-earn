"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./_context/auth-context"; // Adjust the import path as necessary

export default function ClientLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login"); // Adjust the login path as necessary
		}
	}, [isAuthenticated, router]);

	return <>{children}</>;
}
