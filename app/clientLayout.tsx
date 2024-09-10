"use client";
import Cookies from "js-cookie";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "./_context/user-context";
import { useLesson } from "./_context/lesson-context";

export default function ClientLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = useUser();
	const lesson = useLesson();

	useEffect(() => {
		const storedUserData = Cookies.get("user");
		const storedLesson = sessionStorage.getItem("lessons");

		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);
			user.updateUser(parsedUserData);
		}

		if (storedLesson) {
			const parsedLessonData = JSON.parse(storedLesson);
			lesson.updateLesson(parsedLessonData);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	return <>{children}</>;
}
