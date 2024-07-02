"use client"

import { Questions } from "@/data/course-info"




export default function QuizCard(props: Questions) {
    // Shuffle array using the Fisher-Yates algorithm
    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Prepare the options array and shuffle it
    const optArray = [props.ans, props.alt1, props.alt2];
    const shuffledOptions = shuffleArray([...optArray]); //

    return (
        <div id="quiz-card" className="">
            <div className="bg-black text-white border-2 rounded-lg w-[80vw] lg::w-[70vw] h-[500px] p-20 flex flex-col gap-10">
                <h1 className="text-primary font-bold text-2xl">
                    {props.ques}
                </h1>
                {/* Render each option in a shuffled order */}
                {shuffledOptions.map((option, index) => (
                    <div key={index}>
                        <button className="border-white border-[1px] min-w-1/4 text-left p-2 rounded-lg font-semibold">
                         {option}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}