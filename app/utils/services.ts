import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export class LeaderboardService {
	async GETLeaderboard() {
		try {
			const response = await axios.get(`${apiUrl}/get-leaderboard`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			return response.data;
		} catch (err) {
			console.log("Error occured fetching weekly leaderdata", err);
		}
	}

	async GETWeeklyLeaderbard() {
		try {
			const response = await axios.get(`${apiUrl}/get-weekly-leaderboard`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			});
			return response.data;
		} catch (err) {
			console.log("an error has occured fetching leaderboard", err);
		}
	}
}
