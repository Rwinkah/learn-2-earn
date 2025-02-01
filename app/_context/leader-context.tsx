"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	useMemo,
} from "react";
import { LeaderboardUser } from "../types";
interface LeaderboardContextType {
	Leaderboard: LeaderboardUser[];
	WeeklyLeaderboard: WeeklyLeaderboardResponse[];
	updateLeaderBoard: (leaderboardData: any, weeklyData: any) => void;
}
const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
	undefined
);

const LeaderboardProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [Leaderboard, setLeaderboard] = useState<any[]>([]);
	const [WeeklyLeaderboard, setWeeklyboard] = useState<any[]>([]);

	const updateLeaderBoard = (LeaderboardData: any, weeklyData: any) => {
		setLeaderboard(LeaderboardData);
		setWeeklyboard(weeklyData);
	};

	const value = useMemo(
		() => ({ Leaderboard, WeeklyLeaderboard, updateLeaderBoard }),
		[Leaderboard]
	);

	useEffect(() => {
		const leaderboard = localStorage.getItem("leaderboard"); // Or use cookies
		const weeklyboard = localStorage.getItem("weeklyleaderboard");
		if (leaderboard && weeklyboard) {
			updateLeaderBoard(leaderboard, weeklyboard);
		}
	}, []);

	return (
		<LeaderboardContext.Provider value={value}>
			{children}
		</LeaderboardContext.Provider>
	);
};

const useLeaderboard = () => {
	const context = useContext(LeaderboardContext);
	if (context === undefined) {
		throw new Error("useLeaderboard must be used within a LeaderboardProvider");
	}
	return context;
};

export { LeaderboardProvider, useLeaderboard };
