import React from "react";
import DisplayProblems from "./DisplayProblems";
import Courses from "./Courses";
import { problemsType } from "@/app/page";

export default function HomePage({ problems }: { problems: problemsType[] }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Courses />
      <DisplayProblems problems={problems} />
    </div>
  );
}
