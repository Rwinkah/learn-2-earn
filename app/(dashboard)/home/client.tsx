"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import lessonData from "@/data/course-info";
import LessonCard from "@/app/_components/lesson-card";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLesson } from "@/app/_context/lesson-context";
import { useLeaderboard } from "@/app/_context/leader-context";
import { LeaderboardUser, Lesson } from "@/app/types";

export default function Dashboard() {
	const [lessonData, setLessonData] = useState<Lesson[]>([]);
	const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
	const { push } = useRouter();
	const { updateLesson, allLessons } = useLesson();
	const { updateLeaderBoard, Leaderboard } = useLeaderboard();

	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	const updateLessonData = (data: any) => {
		setLessonData(data);
		sessionStorage.setItem("lessons", JSON.stringify(data));
		updateLesson(data);
		console.log(data);
		console.log(allLessons);
	};
	const updateLeaderBoardData = (data: any) => {
		setLeaderboard(data);
		sessionStorage.setItem("leaderboard", JSON.stringify(data));
		updateLeaderBoard(data);
		console.log(data);
		console.log(Leaderboard);
	};

	useEffect(() => {
		let newAccessToken = "";
		const fetchLessonData = async () => {
			try {
				const refreshToken = localStorage.getItem("refresh_token");

				if (!refreshToken) {
					push("/login");
					throw new Error("No auth tokens found");
				}

				const newTokenResponse = await axios.post(`${apiUrl}/token-refresh/`, {
					refresh: refreshToken,
				});

				if (newTokenResponse.status === 200) {
					newAccessToken = newTokenResponse.data.access;
					localStorage.setItem("access_token", newAccessToken);
				} else {
					console.error(
						"An error has occurred, status code ",
						newTokenResponse.status
					);
					push("/login");
					console.error("Token refresh failed");
					return;
				}

				const lessonResponse = await axios.get(`${apiUrl}/lesson-data`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
					},
				});

				// setLessonData(lessonResponse.data);
				// sessionStorage.setItem("lessons", JSON.stringify(lessonResponse.data));
				// updateLesson(lessonResponse.data);
				// console.log(lessonResponse.data);
				// console.log(allLessons);

				updateLessonData(lessonResponse.data);
			} catch (error) {
				console.error("Error fetching lesson data:", error);
				// Optionally, you can set an error state here to display an error message to the user
			} finally {
				console.log("Lessons fetched");
				console.log("All lessons", allLessons);
				console.log("Type of lessonData:", lessonData);
			}
		};

		const fetchLeaderboard = async () => {
			try {
				const leaderboardResponse = await axios.get(
					`${apiUrl}/get-leaderboard`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						},
					}
				);
				updateLeaderBoardData(leaderboardResponse.data);
			} catch (error) {
				console.log("Error fetching leaderboard", error);
			}
		};

		fetchLeaderboard();
		fetchLessonData();
	}, []);

	return (
		<div className="flex-col flex-shrink w-full h-[100vh]  text-black">
			{/* <h1 className="font-bold text-4xl mb-6 text-center text-white">Welcome Learner!</h1> */}
			<Tabs defaultValue="Normie" className=" w-full" id="tab-element">
				<TabsList className="w-[100vw] 3/2xl:w-full h-fit  tabs-scrollbar pb-5 overflow-x-scroll z-[1000] item-top justify-normal pl-10  border-b-[1px]  border-[#FFFFFF33] ">
					<TabsTrigger className="text-lg" value="Normie">
						Normie
					</TabsTrigger>
					<TabsTrigger className="text-lg" value="Amateur">
						{" "}
						Amateur
					</TabsTrigger>
					<TabsTrigger className="text-lg" value="Intermediate">
						{" "}
						Intermediate
					</TabsTrigger>
					<TabsTrigger className="text-lg" value="Expert">
						{" "}
						Expert
					</TabsTrigger>
					<TabsTrigger className="text-lg" value="Idolo">
						{" "}
						Idolo
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="Normie"
					className="w-full overflow-y-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">Welcome to web3!</h1>
						<p className="text-[#B2AFB4] ">
							Ready to embark on a life changing experience? We have an array of
							lessons to onboard you into this very exciting space{" "}
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 mb-20 pl-4 pr-4 items-center ">
						{lessonData.length > 0 ? (
							lessonData
								.filter(
									(item: Lesson) => item.difficulty.toLowerCase() === "normie"
								)
								.map((item: Lesson) => (
									<LessonCard
										key={item.id}
										id={item.id}
										title={item.title}
										creator={item.author_username}
										difficulty={item.difficulty}
										tags={item.tags}
										quiz={item.quiz}
										description={item.lesson_description}
										// docs={generateRandomNumberAsString()}
									/>
								))
						) : (
							// <p className="text-white text-4xl">{lessonData.length}</p>
							<div className="loader "></div>
						)}
					</div>
				</TabsContent>
				<TabsContent
					value="Amateur"
					className="overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Your Journey into web3 Begins Here!
						</h1>
						<p className="text-[#B2AFB4] ">
							You&apos;re just getting started, and that&apos;s great!
							We&apos;ve curated some beginner-friendly lessons to help you
							understand the basics of web3 and blockchain technology.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{lessonData.length > 0 ? (
							lessonData
								.filter(
									(item: Lesson) => item.difficulty.toLowerCase() === "amateur"
								)
								.map((item: Lesson) => (
									<LessonCard
										key={item.id}
										id={item.id}
										title={item.title}
										creator={item.author_username}
										difficulty={item.difficulty}
										tags={item.tags}
										quiz={item.quiz}
										description={item.lesson_description}
										// docs={generateRandomNumberAsString()}
									/>
								))
						) : (
							// <p className="text-white text-4xl">{lessonData.length}</p>
							<div className="loader"></div>
						)}
					</div>
				</TabsContent>
				<TabsContent
					w-full
					value="Intermediate"
					className="w-full overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Elevate Your web3 Skills!
						</h1>
						<p className="text-[#B2AFB4] ">
							You&apos;ve got the basics down! Now it&apos;s time to dive deeper
							with lessons that will expand your understanding and skills in the
							web3 space.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{lessonData.length > 0 ? (
							lessonData
								.filter(
									(item: Lesson) =>
										item.difficulty.toLowerCase() === "intermediate"
								)
								.map((item: Lesson) => (
									<LessonCard
										key={item.id}
										id={item.id}
										title={item.title}
										creator={item.author_username}
										difficulty={item.difficulty}
										tags={item.tags}
										quiz={item.quiz}
										description={item.lesson_description}
										// docs={generateRandomNumberAsString()}
									/>
								))
						) : (
							// <p className="text-white text-4xl">{lessonData.length}</p>
							<div className="loader "></div>
						)}
					</div>
				</TabsContent>
				<TabsContent
					value="Expert"
					className="w-full overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Conquer the Challenges of web3!
						</h1>
						<p className="text-[#B2AFB4] ">
							You&apos;re already well-versed in web3. Our advanced lessons will
							challenge you and help you master the complexities of this
							cutting-edge technology.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{lessonData.length > 0 ? (
							lessonData
								.filter(
									(item: Lesson) => item.difficulty.toLowerCase() === "expert"
								)
								.map((item: Lesson) => (
									<LessonCard
										key={item.id}
										id={item.id}
										title={item.title}
										creator={item.author_username}
										difficulty={item.difficulty}
										tags={item.tags}
										quiz={item.quiz}
										description={item.lesson_description}
										// docs={generateRandomNumberAsString()}
									/>
								))
						) : (
							// <p className="text-white text-4xl">{lessonData.length}</p>
							<div className="loader "></div>
						)}
					</div>
				</TabsContent>
				<TabsContent
					value="Idolo"
					className="w-full overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Become a web3 Visionary!
						</h1>
						<p className="text-[#B2AFB4] ">
							You&apos;re at the pinnacle of web3 knowledge! These lessons are
							designed for true pioneers who are shaping the future of this
							space.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{lessonData.length > 0 ? (
							lessonData
								.filter(
									(item: Lesson) => item.difficulty.toLowerCase() === "idolo"
								)
								.map((item: Lesson) => (
									<LessonCard
										key={item.id}
										id={item.id}
										title={item.title}
										creator={item.author_username}
										difficulty={item.difficulty}
										tags={item.tags}
										quiz={item.quiz}
										description={item.lesson_description}
										// docs={generateRandomNumberAsString()}
									/>
								))
						) : (
							// <p className="text-white text-4xl">{lessonData.length}</p>
							<div className="loader "></div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
