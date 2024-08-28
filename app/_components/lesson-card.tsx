import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { difficulty, Lesson } from "@/app/types";
import ImageWithSkeleton from "./img-skeleton";

import play from "@/assets/images/PlayCircle.png";
import document from "@/assets/images/Document.png";
import Image, { StaticImageData } from "next/image";

import type { Questions } from "@/app/types";

interface tags {
	tag: string;
}

interface lessonCardProps {
	id: string;
	title: string;
	creator: string;
	difficulty: difficulty;
	quiz: Questions[];

	description: string;
	tags: tags[];
}

export default function LessonCard({
	title,
	id,
	creator,
	difficulty,
	quiz,
	description,
	tags,
}: lessonCardProps) {
	return (
		<Card className="w-[90%] flex flex-col border-[1px] border-gray-500  pt-4 h-fit lg:max-h-fit lg:p-8 p-4  bg-[#070707] text-white">
			<Link className="" href={`/lessons/${id}`}>
				<div
					className={`font-light  text-sm mb-2 pb-3 flex items-center  w-full ml-auto ${difficulty}`}>
					<div className="ml-auto">
						author:{" "}
						<span className={`${difficulty} font-medium`}>{creator}</span>
					</div>
				</div>
				<div id="header" className="flex flex-col gap-1">
					<h1 className=" text-xl lg:text-4xl p-0 font-bold ">{title}</h1>
				</div>
				<h2 className=" text-sm lg:mb-10">{description}</h2>
				{/* <img src={img} /> */}
				{/* <ImageWithSkeleton src={img} alt="alt" clas="lop" /> */}
				<div className="lg:flex gap-2 mt-4 lg:mt-8">
					<h3 className="text-white text-xs lg:text-base">Tags:</h3>
					<div
						id="tags"
						className="w-full flex gap-2 flex-wrap text-xs lg:text-sm">
						{tags.map((tag, index) => (
							<h4 key={index} className="text-primaryLight font-semibold">
								{tag.tag}
							</h4>
						))}
					</div>
				</div>
			</Link>
		</Card>
	);
}
