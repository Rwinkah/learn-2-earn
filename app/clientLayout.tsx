"use client";
import Cookies from "js-cookie";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "./_context/user-context";
import { useLesson } from "./_context/lesson-context";
import { useLeaderboard } from "./_context/leader-context";

export default function ClientLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = useUser();
	const lesson = useLesson();
	const leaderboard = useLeaderboard();

	useEffect(() => {
		const storedUserData = Cookies.get("user");
		const storedLesson = sessionStorage.getItem("lessons");
		const storedLeaderboard = sessionStorage.getItem("leaderboard");

		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);
			user.updateUser(parsedUserData);
		}

		if (storedLesson) {
			const parsedLessonData = JSON.parse(storedLesson);
			lesson.updateLesson(parsedLessonData);
		}
		if (storedLeaderboard) {
			const parsedLeaderboard = JSON.parse(storedLeaderboard);
			leaderboard.updateLeaderBoard(parsedLeaderboard);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	return <>{children}</>;
}
