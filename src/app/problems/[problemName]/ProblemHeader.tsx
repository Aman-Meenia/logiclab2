import React from "react";
import { DessertIcon, CodeIcon, Notebook } from "lucide-react";
import { TbFileDescription } from "react-icons/tb";

const ProblemHeader = () => {
  return (
    <div className="flex justify-start gap-2 py-[9px] h-[40px] px-3 rounded-sm bg-[rgba(13,30,50)] text-gray-500">
      <div className="flex gap-2 hover:text-[white]">
        <TbFileDescription size={20} />
        Description
      </div>
      <div className="flex gap-2 hover:text-[white]">
        <CodeIcon size={20} />
        Submissions
      </div>
    </div>
  );
};

export default ProblemHeader;
