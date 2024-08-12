"use client";
import { AuthProvider } from "../_context/auth-context";
import { UserProvider } from "../_context/user-context";
import { ReactNode } from "react";

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<AuthProvider>
			<UserProvider>{children}</UserProvider>
		</AuthProvider>
	);
};

export default Providers;
