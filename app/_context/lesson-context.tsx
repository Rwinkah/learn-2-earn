"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Lesson } from "../types";
interface LessonContextType {
	allLessons: Lesson[] | null;
	updateLesson: (lesson: Lesson) => void;
}
export const LessonsContext = createContext<LessonContextType | undefined>(
	undefined
);

const LessonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [allLessons, setLessons] = useState(null);

	const updateLesson = (lessonsData: any) => {
		setLessons(lessonsData);
	};

	return (
		<LessonsContext.Provider value={{ updateLesson, allLessons }}>
			{children}
		</LessonsContext.Provider>
	);
};

const useLesson = () => {
	const context = useContext(LessonsContext);
	if (context === undefined) {
		throw new Error("useLesson must be used within a LessonProvider");
	}
	return context;
};

export { LessonsProvider, useLesson };
