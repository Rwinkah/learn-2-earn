"use client"

import React, { useEffect, useState } from 'react';
import { Questions } from "@/data/course-info"
import type { Answer } from '../quiz/[quiz]/page';

interface QuizCardProps extends Questions {
  updateAnswer: (questionIndex: number, isCorrect: number) => void;
  questionIndex: number;

}
export default function QuizCard({ ques, ans, alt1, alt2, updateAnswer, questionIndex }: QuizCardProps) {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Step 1

    useEffect(() => {
        // Shuffle array using the Fisher-Yates algorithm
        function shuffleArray(array: any[]) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
          }
          return array;
        }
    
        // Prepare the options array and shuffle it
        const options = [ans, alt1, alt2];
        setShuffledOptions(shuffleArray([...options]));
      }, [ans, alt1, alt2]); 

    // Function to handle answer selection
    const handleSelectAnswer = (selectedOption: string) => {
        setSelectedOption(selectedOption); // Step 3
        const isCorrect = selectedOption === ans ? 1 : 0;
        updateAnswer(questionIndex, isCorrect);
    };

    return (
        <div id="quiz-card" className="bg-black text-white border-2 rounded-lg w-[80vw] lg:w-[70vw] h-[500px] p-20 flex flex-col gap-10">
            <h1 className="text-primary font-bold text-2xl">
                {ques}
            </h1>
            {shuffledOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleSelectAnswer(option)}
                    className={`border-white border-[1px] min-w-1/4 w-fit text-left p-2 rounded-lg font-semibold ${selectedOption === option ? 'bg-primary text-white border-none shadow-lg' : ''}`} // Step 2
                >
                    {option}
                </button>
            ))}

        </div>
    );
}