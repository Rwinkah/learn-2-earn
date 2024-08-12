"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import axios from "axios";
import { OnboardUser } from "../types";

// Define the shape of the context state
interface UserContextType {
	onboardUser: OnboardUser | null;
	// fetchUser: () => void;
	updateUser: (user: any) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [onboardUser, setOnboardUser] = useState(null);

	// const fetchUser = async () => {
	// 	try {
	// 		const response = await axios.get("/api/user/");
	// 		setOnboardUser(response.data);
	// 	} catch (error) {
	// 		console.error("Failed to fetch user:", error);
	// 	}
	// };

	const updateUser = (user: any) => {
		setOnboardUser(user);
	};

	return (
		<UserContext.Provider value={{ onboardUser, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};

// Custom hook to use the UserContext
const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export { UserProvider, useUser };
