"use client";
import QuizCard from "@/app/_components/quiz-card";
// import lessons from "@/data/course-info";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { number } from "zod";
import { Button } from "@/components/ui/button";
import { useLesson } from "@/app/_context/lesson-context";
import axios from "axios";
import { useUser } from "@/app/_context/user-context";

export interface Answer {
	questionIndex: number;
	isCorrect: number;
}

export default function Page({ params }: { params: { quiz: string } }) {
	const { push } = useRouter();
	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const { allLessons } = useLesson();
	const user = useUser();
	const router = useRouter();
	let currentLesson = params.quiz;
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [submitted, setSubmitted] = useState(false); // Track if the quiz has been submitted
	const [score, setScore] = useState<number>(0);
	const updateAnswer = (questionIndex: number, isCorrect: number) => {
		const newAnswers = [...answers];
		newAnswers[questionIndex] = { questionIndex, isCorrect };
		setAnswers(newAnswers);
	};

	const lessonData = allLessons.find(
		(lesson) => lesson.id.toString() === currentLesson
	);
	console.log(lessonData);
	if (!lessonData) {
		return <div className="loader"></div>;
	}

	const handleSubmit = async () => {
		const finalScore = answers.reduce(
			(acc, answer) => acc + (answer?.isCorrect || 0),
			0
		);
		setScore(finalScore);
		console.log(`Final Score: ${finalScore}`);
		setSubmitted(true);

		if (finalScore > 7) {
			try {
				const refreshToken = localStorage.getItem("refresh_token");

				if (!refreshToken) {
					push("/login");
					throw new Error("No auth tokens found");
				}

				const newTokenResponse = await axios.post(`${apiUrl}/token-refresh/`, {
					refresh: refreshToken,
				});

				let newAccessToken = "";
				if (newTokenResponse.status === 200) {
					newAccessToken = newTokenResponse.data.access;
					localStorage.setItem("access_token", newAccessToken);
				} else {
					console.error(
						"an error has occured, status code ",
						newTokenResponse.status
					);
					push("/login");
					return;
				}

				// Calculate the final score by summing up the 'isCorrect' values in the answers array
				// Treat null or undefined values as 0

				const response = await axios.post(
					`${apiUrl}/update-oxp/`,
					{
						oxp: lessonData.oxp_amount,
						title: lessonData.title,
					},
					{
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
						},
					}
				);
			} catch (error: any) {
				console.error("error updating xp", error);
			} finally {
			}
		}
	};

	// useEffect(() => {
	//     if (submitted) {
	//       // Redirect to the home page after 10 seconds
	//       const timer = setTimeout(() => {
	//         router.push('/');
	//       }, 10000000);
	//       return () => clearTimeout(timer);
	//     }
	//   }, [submitted, router]);

	return !submitted ? (
		<div className="bg-[#2a0b38] w-full h-[100vh] overflow-scroll flex flex-col p-10 gap-20 pt-10">
			<div
				id="quiz-header"
				className="self-center flex flex-col items-center gap-4">
				<h1 className="font-bold text-4xl text-white">
					<span className="text-primaryLight">Onboard</span>Me Quiz
				</h1>
				<h2 className="text-white text-2xl font-semibold">
					{lessonData.title}
				</h2>
			</div>
			<div className="flex items-center justify-center flex-col gap-14">
				{lessonData.quiz.map((item, index) => (
					<QuizCard
						key={index}
						{...item}
						questionIndex={index}
						updateAnswer={updateAnswer}
					/>
				))}
			</div>
			<button
				className="text-white bg-primary w-2/3 lg:w-1/5 self-center rounded-3xl text-2xl font-semibold p-4 mb-[1000px]"
				onClick={handleSubmit}>
				Submit
			</button>
		</div>
	) : (
		<div
			id="quiz-header"
			className=" bg-[#2a0b38] pt-10 h-[100vh] w-full self-center flex flex-col items-center gap-4">
			<h1 className="font-bold text-4xl text-white">
				<span className="text-primaryLight">Onboard</span>Me Quiz
			</h1>
			<h2 className="text-white text-2xl font-semibold">{lessonData.title}</h2>
			<div className="flex flex-col justify-between pb-20 h-full mt-40 text-3xl  text-white md:w-full text-wrap w-4/5 font-semibold text-center">
				{score < 8 ? (
					<div className="flex flex-col w-full gap-8">
						<h3> Scored less than 80%, try again </h3>
						<h4>
							Score: <span className="text-red-700">{score}/10</span>
						</h4>
					</div>
				) : (
					<div className="flex flex-col w-full  gap-8">
						<h3> You passed! and might be eliible for rewards </h3>
						<h4>
							Score: <span className="text-green-700">{score}/10</span>
						</h4>
					</div>
				)}

				<div>
					<Button
						onClick={() => router.push("/")}
						variant={"ghost"}
						className=" hover:scale-105 border-[1px] text-xl border-primary lg:w-1/4  lg:p-2 h-15 lg:h-[60px] font-bold rounded-3xl">
						Return to Home
					</Button>
				</div>
			</div>
		</div>
	);
}
