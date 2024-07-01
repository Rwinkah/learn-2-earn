import React from "react";
import { useEffect } from "react";
import search from "@/assets/images/search_icon.png"

interface SelectCourseProps {
  course: string[];
  setCourse: React.Dispatch<React.SetStateAction<string[]>>;
  courseList: string[];
}

export function SelectCourse({ course, setCourse, courseList }: SelectCourseProps) {
  // useEffect(() => {
  //   console.log(course);
  // }, [course]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = e.target.value;
    setCourse(prevCourses => [...prevCourses, selectedCourse]);
    console.log(course);
  };


  return (
<div className="relative w-[100%]">
  <select
    onChange={handleChange}
    className="appearance-none w-full h-[3rem] pl-[1rem] pr-[2.5rem] text-black border rounded-3xl"
  >
        <option value="" disabled selected>
      Select a course
    </option>
    {courseList.map((courseName, index) => (
      <option className="text-black" key={index} value={courseName}>
        {courseName}
      </option>
    ))}
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center px-[0.5rem] pointer-events-none">
    <svg
      className="w-6 h-6 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>

  );
}
