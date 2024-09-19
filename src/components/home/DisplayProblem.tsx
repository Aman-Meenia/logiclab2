import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { problemsType } from "@/app/page";
import Link from "next/link";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-500 hover:bg-green-600";
    case "medium":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "hard":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};
const DisplayProblem = ({ problem }: { problem: problemsType }) => {
  return (
    <TableRow key={problem.problemNumber}>
      <TableCell className="text-[16px]">{problem.problemNumber}</TableCell>
      {/* <Link href={`/problems/${problem.problemTitle}`}> */}
      <TableCell className="text-[16px]">
        <Link href={`/problems/${problem.problemTitle}`}>
          {problem.problemName}
        </Link>
      </TableCell>
      {/* </Link> */}
      <TableCell className="font-bold">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          Solution <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell className="text-[16px]">
        <Badge
          className={`${getDifficultyColor(problem.difficulty)} w-full sm:w-auto text-center text-[14px]`}
        >
          {problem.difficulty}
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default DisplayProblem;
