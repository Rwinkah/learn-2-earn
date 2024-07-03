"use client"
import QuizCard from "@/app/_components/quiz-card";
import lessons from "@/data/course-info";
import { useState } from "react";


export interface Answer {
    questionIndex: number;
    isCorrect: number;
  }


  export default function Page({ params }: { params: { quiz: string } }) {
    let currentLesson = params.quiz;
    const [answers, setAnswers] = useState<Answer[]>([]);
    const updateAnswer = (questionIndex: number, isCorrect: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = { questionIndex, isCorrect };
        setAnswers(newAnswers);
      };
      const handleSubmit = () => {
        // Calculate the final score by summing up the 'isCorrect' values in the answers array
        const finalScore = answers.reduce((acc, answer) => acc + answer.isCorrect, 0);
        console.log(`Final Score: ${finalScore}`);
    };
    

    const lessonData = lessons.find((lesson) => lesson.id === currentLesson);
    if (!lessonData) {
      return <div className="text-primary text-4xl">Lesson unavailable</div>;
    }

    return (
        <div className="bg-[#2a0b38] w-full h-[100vh] overflow-scroll flex flex-col p-10 gap-20 pt-10">
            <div id="quiz-header" className="self-center flex flex-col items-center gap-4">
                <h1 className="font-bold  text-4xl text-white"> <span className="text-primaryLight">Onboard</span>Me Quiz </h1>
                <h2 className="text-white text-2xl font-semibold">{lessonData.title}</h2>
            </div>
            <div className="flex items-center justify-center flex-col gap-14">
                {lessonData.quiz.map((item, index)=> (
                    <QuizCard key={index} {...item}  questionIndex={index} updateAnswer={updateAnswer}  />
                ))}
            </div>
            <button className="text-white bg-primary w-2/3 lg:w-1/5 self-center rounded-3xl text-2xl font-semibold  p-4" onClick={handleSubmit}>Submit</button>
        </div>
    )
}