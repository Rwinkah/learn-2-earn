"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { AuthContextType } from "../types";
import Cookies from "js-cookie";
// Define the shape of the context state

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

// Create a provider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = () => {
		setIsAuthenticated(true);
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("user");
		sessionStorage.removeItem("user");
		Cookies.remove("user");
	};

	useEffect(() => {
		const token = localStorage.getItem("access_token"); // Or use cookies
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
