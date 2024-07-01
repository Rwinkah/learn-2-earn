"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

export function SelectScrollable() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    const match = pathname.match(/\/courses\/(\w+)/);
    if (match) {
      setSelected(match[1]);
    }
  }, [pathname]);

  const handleValueChange = (value: string) => {
    setSelected(value);
    router.push(`/courses/${value}`);
  };
  const isCourseActive = pathname.includes("/courses");
  return (
    <Select value={selected} onValueChange={handleValueChange}>
      <SelectTrigger
        className={`${
          isCourseActive ? "bg-primary" : "bg-transparent"
        } text-white border-none`}
      >
        {isCourseActive? <SelectValue placeholder="Lessons" /> : 'Lessons' }
      </SelectTrigger>
      <SelectContent>
        {data.map((semester) => (
          <SelectGroup key={semester.label}>
            <SelectLabel className="text-white border-none">
              {semester.label}
            </SelectLabel>
            {semester.options.map((course) => (
              <SelectItem
                key={course.value}
                className="text-white border-none"
                value={course.value}
              >
                {course.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

const data = [
  {
    label: "First Semester",
    options: [
      { value: "CPE515", label: "CPE515" },
      { value: "CPE501", label: "CPE501" },
      { value: "PRE571", label: "PRE571" },
      { value: "CPE513", label: "CPE513" },
      { value: "CPE557", label: "CPE557" },
      { value: "CPE575", label: "CPE575" },
      { value: "CPE593", label: "CPE593" },
      { value: "CPE591", label: "CPE591" },
    ],
  },
  {
    label: "Second Semester",
    options: [
      { value: "CPE522", label: "CPE522" },
      { value: "CPE516", label: "CPE516" },
      { value: "CPE514", label: "CPE514" },
      { value: "CPE524", label: "CPE524" },
      { value: "CPE512", label: "CPE512" },
      { value: "CPE556", label: "CPE556" },
      { value: "PRE572", label: "PRE572" },
      { value: "CPE526", label: "CPE526" },
      { value: "CPE544", label: "CPE544" },
      { value: "CPE572", label: "CPE572" },
    ],
  },
];
