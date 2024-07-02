"use client"
import QuizCard from "@/app/_components/quiz-card";
import lessons from "@/data/course-info";


export default function Page({ params }: { params: { quiz: string } }) {
    let currentLesson = params.quiz;
    const lessonData = lessons.find((lesson) => lesson.id === currentLesson);
    if (!lessonData) {
      return <div className="text-primary text-4xl">Lesson unavailable</div>;
    }

    return (
        <div className="bg-[#2a0b38] w-full h-[100vh] overflow-scroll flex flex-col p-10 gap-20 pt-10">
            <div id="quiz-header" className="self-center">
                <h1 className="font-bold  text-4xl text-white"> <span className="text-primaryLight">Onboard</span>Me Quiz </h1>
            </div>
            <div className="flex items-center justify-center flex-col gap-14">
                {lessonData.quiz.map((item, index)=> (
                    <QuizCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}