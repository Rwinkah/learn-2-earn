"use client";
import Cookies from "js-cookie";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useUser } from "./_context/user-context";
import { useLesson } from "./_context/lesson-context";
import { useLeaderboard } from "./_context/leader-context";
import { Lesson, OnboardUser } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const socketUrl = process.env.NEXT_PUBLIC_SOCKET;

export default function ClientLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = useUser();
	const lesson = useLesson();
	const leaderboard = useLeaderboard();

	const handleWebSocketMessage = useCallback(
		(event: MessageEvent) => {
			const data = JSON.parse(event.data);
			let newBoard: OnboardUser[] = [];
			let newLessons: Lesson[] = [];

			switch (data.type) {
				case "new_user":
					// Handle new user creation
					// console.log("New user created:", data.user);
					newBoard = [...leaderboard.Leaderboard, data.user];
					break;
				case "lesson_answered":
					// Handle lesson answered
					const updLesson = JSON.parse(data.lesson);
					console.log("Lesson answered:");
					newLessons = updLesson;
					lesson.updateLesson(newLessons);

					break;
				case "new_lesson":
					// Handle new lesson creation
					console.log("New lesson created:", data.lesson);
					newLessons = [...lesson.allLessons, data.lesson];
					lesson.updateLesson(newLessons);
					break;
				default:
					console.log("Unknown message type:", data.type);
			}
		},
		[lesson.updateLesson]
	);
	function initDataLoad() {
		const storedUserData = Cookies.get("user");
		const storedLesson = sessionStorage.getItem("lessons");
		const storedLeaderboard = sessionStorage.getItem("leaderboard");
		const storedWeeklyLeaderboard = sessionStorage.getItem("weeklyleaderboard");
		let parsedWeeklyLeaderboard = [];

		if (storedUserData) {
			const parsedUserData = JSON.parse(storedUserData);
			user.updateUser(parsedUserData);
		}

		if (storedLesson) {
			const parsedLessonData = JSON.parse(storedLesson);
			lesson.updateLesson(parsedLessonData);
		}

		if (storedWeeklyLeaderboard) {
			parsedWeeklyLeaderboard = JSON.parse(storedWeeklyLeaderboard);
		}
		if (storedLeaderboard) {
			const parsedLeaderboard = JSON.parse(storedLeaderboard);
			leaderboard.updateLeaderBoard(parsedLeaderboard, parsedWeeklyLeaderboard);
		}
	}

	useEffect(() => {
		initDataLoad();
		const socket = new WebSocket(`${socketUrl}/ws/updates/`);

		socket.onmessage = handleWebSocketMessage;

		socket.onopen = () => {
			console.log("websocket connection established");
		};

		socket.onerror = (error) => {
			console.error("Websoket error: ", error);
			initDataLoad();
		};

		socket.onclose = (event) => {
			console.log(
				`Websocket connection.closed: {eventCode: ${event.code}, eventReason: ${event.reason}}`
			);
		};

		return () => {
			socket.close();
		};
	}, []); // Empty dependency array ensures this runs only once on mount

	return <>{children}</>;
}
