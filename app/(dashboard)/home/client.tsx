"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseData from "@/data/course-info";
import LessonCard from "@/app/_components/lesson-card";
import TabNote from "@/app/_components/tabnote";
import eth from "@/assets/images/eth.jpeg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
	return (
		<div className="flex-col flex-shrink w-full h-[100vh]  text-black">
			{/* <h1 className="font-bold text-4xl mb-6 text-center text-white">Welcome Learner!</h1> */}
			<Tabs defaultValue="Normie" className="w-full" id="tab-element">
				<TabsList className="w-full z-[1000] item-top justify-normal pl-10  border-b-[1px]  border-[#FFFFFF33] h-11">
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
					className="overflow-scroll h-[100vh] pr-0   ">
					<div className="flex flex-col gap-3 text-[#F4E7FFE5] p-10 lg:border-[#FFFFFF33] border-b-[1px]">
						<h1 className="font-semibold text-3xl ">Welcome to web3!</h1>
						<p className="text-[#B2AFB4] ">
							Ready to embark on a life changing experience? We have an array of
							lessons to onboard you into this very exciting space{" "}
						</p>
					</div>
					<div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center mb-[10rem]">
						{CourseData.map((item) => (
							<LessonCard
								key={item.id}
								id={item.id}
								title={item.title}
								creator={item.creator}
								level={item.level}
								img={eth}
								tags={item.tags}
								quiz={item.quiz}
								description={item.description}
								// docs={generateRandomNumberAsString()}
							/>
						))}
					</div>
				</TabsContent>
				<TabsContent value="timeline">
					<TabNote />
				</TabsContent>
			</Tabs>
		</div>
	);
}
