"use client"
import lessons from "@/data/course-info";


export default function Page({ params }: { params: { lesson: string } }) {
    let currentLesson = params.lesson;
    const lessonData = lessons.find((lesson) => lesson.id === currentLesson);
  
    if (!lessonData) {
      return <div className="text-primary text-4xl">Lesson unavailable</div>;
    }

    return (
        <div className="bg-[#2a0b38]">
            <div id="quiz-header">
                <h1 className="text-primaryLight">{lessonData.title} </h1>
            </div>
        </div>
    )
}