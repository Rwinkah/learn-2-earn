"use client";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useLesson } from "@/app/_context/lesson-context";
// import { Metadata } from "next";
import { Link as Linkicon } from "lucide-react";
// export const metadata: Metadata = {
// 	title: "Lessons",
// 	openGraph: { title: "Lessons" },
// 	twitter: { title: "Lessons" },
// };

export default function Page({ params }: { params: { lesson: string } }) {
	const { allLessons } = useLesson();
	console.log(allLessons);
	let currentLesson = params.lesson;
	console.log(currentLesson);
	const lessonData = allLessons.find(
		(lesson: any) => lesson.id.toString() === currentLesson
	);
	console.log(lessonData);

	if (!lessonData) {
		return <div className="text-primary text-4xl">Lesson unavailable</div>;
	}

	return (
		<div className="text-white flex flex-col items-center pt-10 gap-20 overflow-scroll h-[100vh]">
			<div className="flex flex-col gap-1 font-semibold" id="lesson-header">
				<h1 className="font-bold text-3xl lg:text-5xl">{lessonData.title}</h1>
				<h2 className=" self-center text-sm">
					Level:{" "}
					<span className={` ${lessonData.difficulty}`}>
						{lessonData.difficulty}
					</span>
				</h2>
			</div>
			<div className="border-[1px] border-gray-500 w-[90%] rounded-sm p-10  gap-20  flex flex-col">
				<div id="lesson-intro" className="gap-5 flex-col flex">
					<h3 className="text-primaryLight text-xl font-semibold">
						{lessonData.lesson_intro.title}
					</h3>
					<p>{lessonData.lesson_intro.body}</p>
				</div>

				<div id="lesson-body" className="gap-5 flex-col flex">
					<h3 className="text-primaryLight text-xl font-semibold">
						{lessonData.lesson_body.title}
					</h3>
					<p>{lessonData.lesson_body.body}</p>
				</div>

				<div id="lesson-summary" className="gap-5 flex-col flex">
					<h3 className="text-primaryLight text-xl font-semibold">
						{lessonData.lesson_summary.title}
					</h3>
					<p>{lessonData.lesson_summary.body}</p>
				</div>

				<Link
					href={`/quiz/${lessonData.id}`}
					className="flex self-center gap-4 font-bold text-lg text-primaryLight">
					Take the quiz
					<Linkicon />
				</Link>
			</div>
			<div className="flex justify-between w-full p-16 pt-0 pb-[100px] mb-[10rem]">
				<span className="flex items-center gap-6 justify-center">
					<ThumbsUpIcon color="green" />
					<ThumbsDownIcon color="maroon" />
				</span>

				<h1>
					Created by{" "}
					<span className="text-primaryLight">
						{lessonData.author_username}
					</span>
				</h1>
			</div>
		</div>
	);
}
