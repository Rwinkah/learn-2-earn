import { StaticImageData } from "next/image";
export interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}
export interface CustomIcon {
	size?: number;
	pathFill?: string;
	spaceFill?: string;
}

export interface LessonTags {
	tag: string;
}

export interface OnboardUser {
	username: string;
	email: string;
	oxp: number;
	completed_quiz: string[];
}
export type difficulty =
	| "Normie"
	| "Amateur"
	| "Intermediate"
	| "Expert"
	| "Idolo";

export interface ArticleSubObject {
	subtitle: string;
	text: string;
}

export interface Questions {
	ques: string;
	ans: string;
	alt1: string;
	alt2: string;
}

export interface Lesson {
	id: string;
	title: string;
	creator: string;
	difficulty: difficulty;
	quiz: Questions[];
	article: {
		intro: ArticleSubObject;
		body: ArticleSubObject;
		summary: ArticleSubObject;
	};
	description: string;
	// img: StaticImageData;
	tags: string[];
	upvote?: number;
	downvote?: number;
	oxp_amount?: number;
}
