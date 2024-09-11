"use client";
import { AuthProvider } from "../_context/auth-context";
import { LeaderboardProvider } from "../_context/leader-context";
import { LessonsProvider } from "../_context/lesson-context";
import { UserProvider } from "../_context/user-context";
import { ReactNode } from "react";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<AuthProvider>
			<UserProvider>
				<LessonsProvider>
					<LeaderboardProvider>{children}</LeaderboardProvider>
				</LessonsProvider>
			</UserProvider>
		</AuthProvider>
	);
};

export default Providers;
