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
	updateLeaderBoard: (leaderboardData: any) => void;
}
const LeaderboardContext = createContext<LeaderboardContextType | undefined>(
	undefined
);

const LeaderboardProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [Leaderboard, setLeaderboard] = useState<any[]>([]);

	const updateLeaderBoard = (LeaderboardData: any) => {
		setLeaderboard(LeaderboardData);
	};

	const value = useMemo(
		() => ({ Leaderboard, updateLeaderBoard }),
		[Leaderboard]
	);

	useEffect(() => {
		const leaderboard = localStorage.getItem("leaderboard"); // Or use cookies
		if (leaderboard) {
			updateLeaderBoard(leaderboard);
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
