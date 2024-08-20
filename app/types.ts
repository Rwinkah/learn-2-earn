import { StaticImageData } from "next/image";
import { string } from "zod";

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
	level: difficulty;
	quiz: Questions[];
	article: {
		intro: ArticleSubObject;
		body: ArticleSubObject;
		summary: ArticleSubObject;
	};
	description: string;
	img: StaticImageData;
	tags: string[];
}
