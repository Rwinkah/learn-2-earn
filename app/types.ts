import { StaticImageData } from "next/image";
import { z } from "zod";

//ZOD SCHEMAS
export const loginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const signUpSchema = z.object({
	displayName: z.string(),
	email: z.string().email("invalid email"),
	password: z.string(),
	passwordConfirm: z.string(),
});
export type SignupSchema = z.infer<typeof signUpSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

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

type leader = {
	username: string;
};

export interface LeaderboardUser {
	user: leader;
	onboardXP: number;
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
	title: string;
	body: string;
}

export interface Questions {
	question: string;
	answer: string;
	alt1: string;
	alt2: string;
}

export interface Lesson {
	id: string;
	title: string;
	author_username: string;
	difficulty: difficulty;
	quiz: Questions[];
	lesson_intro: ArticleSubObject;
	lesson_body: ArticleSubObject;
	lesson_summary: ArticleSubObject;
	lesson_description: string;
	// img: StaticImageData;
	tags: LessonTags[];
	upvote?: number;
	downvote?: number;
	oxp_amount?: number;
}
