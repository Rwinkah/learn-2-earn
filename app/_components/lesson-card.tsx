import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import  {difficulty, Lesson} from '@/data/course-info'
import ImageWithSkeleton from "./img-skeleton";

import play from "@/assets/images/PlayCircle.png";
import document from "@/assets/images/Document.png";
import Image, { StaticImageData } from "next/image";

import type { Questions } from "@/data/course-info";

interface lessonCardProps {
  id: string;
  title: string;
  creator: string;
  level: difficulty;
  quiz: Questions[]

  description: string
  img: StaticImageData
  tags: string[]
}


export default function LessonCard({ title, id, creator, level, quiz, description, img, tags }:lessonCardProps) {
  return (
    <Card className='w-4/5 flex flex-col border-[1px] border-gray-500  pt-4 min-h-[90vh] p-8  bg-[#070707] text-white'>
      <Link className="min-h-[90vh]" href={`/lessons/${id}`}>
        <div id='header' className="flex flex-col gap-1">
          <h2 className="font-medium text-sm">
              {creator} | <span className={`${level}`}>{level}</span>
            </h2>
            <h1 className=" text-4xl p-0 font-bold ">
              {title}
            </h1>
        </div>
        <h2 className="mb-10">{description}</h2>
        {/* <img src={img} /> */}
        <ImageWithSkeleton src={img} alt="alt" clas="lop"/>
        <div className="flex gap-2 mt-8">
          <h3 className="text-white">Tags:</h3>
          <div id="tags" className="w-full flex gap-2">
            {tags.map((tag) => (
              <h4 key={tag} className="text-primaryLight font-semibold">{tag}</h4>
            ))}
        </div>

        </div>
      </Link>      
    </Card>

  );
}
