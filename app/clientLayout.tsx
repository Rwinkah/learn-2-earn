"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "./_context/user-context";

export default function ClientLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = useUser();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const storedUserData = sessionStorage.getItem("user");

		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);
			setUserData(parsedUserData);
			user.updateUser(parsedUserData);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	return <>{children}</>;
}
