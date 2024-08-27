"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	useMemo,
} from "react";
import { Lesson } from "../types";
interface LessonContextType {
	allLessons: Lesson[];
	updateLesson: (lesson: Lesson) => void;
}
export const LessonsContext = createContext<LessonContextType | undefined>(
	undefined
);

const LessonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [allLessons, setLessons] = useState([]);

	const updateLesson = (lessonsData: any) => {
		setLessons(lessonsData);
	};

	const value = useMemo(() => ({ allLessons, updateLesson }), [allLessons]);

	useEffect(() => {
		const lesson = localStorage.getItem("lessons"); // Or use cookies
		if (lesson) {
			updateLesson(lesson);
		}
	}, []);

	return (
		<LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>
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
