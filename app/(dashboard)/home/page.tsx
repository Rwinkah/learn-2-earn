import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseData from "@/data/course-info";
import LessonCard from "@/app/_components/lesson-card";
import TabLib from "@/app/_components/tablib";
import TabNote from "@/app/_components/tabnote";
import eth from '@/assets/images/eth.jpeg'


export const metadata: Metadata = {
  title: "Home",
  openGraph: { title: "Home" },
  twitter: { title: "Home" },
};

function generateRandomNumberAsString() {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber.toString(); // Convert the number to a string
}


export default function Dashboard() {
  return (
    <div className="flex-col flex-shrink w-full h-[100vh]  text-black">
      {/* <h1 className="font-bold text-4xl mb-6 text-center text-white">Welcome Learner!</h1> */}
      <Tabs defaultValue="lessons" className="w-full" id="tab-element">
        <TabsList className='w-full z-[1000] item-top justify-center border-b border-gray-500 h-11'>
          <TabsTrigger className="text-lg" value="lessons">Lessons</TabsTrigger>
          <TabsTrigger  className="text-lg" value="timeline"> Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className='overflow-scroll h-[100vh]'>
        <div className=" flex flex-col gap-10 pt-10 pl-4 pr-4 items-center">
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
