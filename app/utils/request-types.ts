interface AuthResponse {
	success: boolean;
	message?: string;
	error?: string;
}

interface WeeklyLeaderboardResponse {
	username: string;
	total_xp: number;
}
