"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseData from "@/data/course-info";
import LessonCard from "@/app/_components/lesson-card";
import TabNote from "@/app/_components/tabnote";
import eth from "@/assets/images/eth.jpeg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@/app/_context/user-context";
import { useLesson } from "@/app/_context/lesson-context";
import { Lesson } from "@/app/types";

export default function Dashboard() {
	const [allLessons, setAllLessons] = useState<Lesson[]>([]);
	const { push } = useRouter();
	const lessons = useLesson();
	const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	useEffect(() => {
		const fetchLessonData = async () => {
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
				console.error("Token refresh failed");
				return;
			}
			axios
				.get(`${apiUrl}/lesson-data`, {
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				})
				.then((response: AxiosResponse) => {
					// console.log(response.data);
					setAllLessons(response.data);
				})
				.catch((error) => {
					console.error("Error fetching lesson data:", error);
					// Optionally, you can set an error state here to display an error message to the user
				})
				.finally(() => {
					console.log("lesosns fetched");
				});
		};

		fetchLessonData();
	}, []);

	return (
		<div className="flex-col flex-shrink w-full h-[100vh]  text-black">
			{/* <h1 className="font-bold text-4xl mb-6 text-center text-white">Welcome Learner!</h1> */}
			<Tabs defaultValue="Normie" className=" w-full" id="tab-element">
				<TabsList className="w-[100vw] h-fit  tabs-scrollbar pb-5 overflow-x-scroll z-[1000] item-top justify-normal pl-10  border-b-[1px]  border-[#FFFFFF33] ">
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
					className="overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">Welcome to web3!</h1>
						<p className="text-[#B2AFB4] ">
							Ready to embark on a life changing experience? We have an array of
							lessons to onboard you into this very exciting space{" "}
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.filter((item) => item.difficulty === "Normie").map(
							(item) => (
								<LessonCard
									key={item.id}
									id={item.id}
									title={item.title}
									creator={item.creator}
									difficulty={item.difficulty}
									tags={item.tags}
									quiz={item.quiz}
									description={item.description}
									// docs={generateRandomNumberAsString()}
								/>
							)
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
							You're just getting started, and that's great! We've curated some
							beginner-friendly lessons to help you understand the basics of
							web3 and blockchain technology.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.filter((item) => item.difficulty === "Amateur").map(
							(item) => (
								<LessonCard
									key={item.id}
									id={item.id}
									title={item.title}
									creator={item.creator}
									difficulty={item.difficulty}
									tags={item.tags}
									quiz={item.quiz}
									description={item.description}
									// docs={generateRandomNumberAsString()}
								/>
							)
						)}
					</div>
				</TabsContent>
				<TabsContent
					value="Intermediate"
					className="overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Elevate Your web3 Skills!
						</h1>
						<p className="text-[#B2AFB4] ">
							You've got the basics down! Now it's time to dive deeper with
							lessons that will expand your understanding and skills in the web3
							space.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.filter(
							(item) => item.difficulty === "Intermediate"
						).map((item) => (
							<LessonCard
								key={item.id}
								id={item.id}
								title={item.title}
								creator={item.creator}
								difficulty={item.difficulty}
								tags={item.tags}
								quiz={item.quiz}
								description={item.description}
								// docs={generateRandomNumberAsString()}
							/>
						))}
					</div>
				</TabsContent>
				<TabsContent
					value="Expert"
					className="overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Conquer the Challenges of web3!
						</h1>
						<p className="text-[#B2AFB4] ">
							You're already well-versed in web3. Our advanced lessons will
							challenge you and help you master the complexities of this
							cutting-edge technology.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.filter((item) => item.difficulty === "Expert").map(
							(item) => (
								<LessonCard
									key={item.id}
									id={item.id}
									title={item.title}
									creator={item.creator}
									difficulty={item.difficulty}
									tags={item.tags}
									quiz={item.quiz}
									description={item.description}
									// docs={generateRandomNumberAsString()}
								/>
							)
						)}
					</div>
				</TabsContent>
				<TabsContent
					value="Idolo"
					className="overflow-scroll h-[80vh]  pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">
							Become a web3 Visionary!
						</h1>
						<p className="text-[#B2AFB4] ">
							You're at the pinnacle of web3 knowledge! These lessons are
							designed for true pioneers who are shaping the future of this
							space.
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.filter((item) => item.difficulty === "Idolo").map(
							(item) => (
								<LessonCard
									key={item.id}
									id={item.id}
									title={item.title}
									creator={item.creator}
									difficulty={item.difficulty}
									tags={item.tags}
									quiz={item.quiz}
									description={item.description}
									// docs={generateRandomNumberAsString()}
								/>
							)
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
