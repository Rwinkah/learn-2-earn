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
	| "normie"
	| "amateur"
	| "intermediate"
	| "expert"
	| "idolo";

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
	author_username: string;
	difficulty: difficulty;
	quiz: Questions[];
	article: {
		intro: ArticleSubObject;
		body: ArticleSubObject;
		summary: ArticleSubObject;
	};
	lesson_description: string;
	// img: StaticImageData;
	tags: LessonTags[];
	upvote?: number;
	downvote?: number;
	oxp_amount?: number;
}
