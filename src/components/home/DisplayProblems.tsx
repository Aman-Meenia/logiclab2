"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { problemsType } from "@/app/page";
import DisplayProblem from "./DisplayProblem";
//
// const problems = [
//   { id: 1, title: "Two Sum", difficulty: "Easy" },
//   { id: 2, title: "Add Two Numbers", difficulty: "Medium" },
//   {
//     id: 3,
//     title: "Longest Substring Without Repeating Characters",
//     difficulty: "Medium",
//   },
//   { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
//   { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium" },
//   { id: 6, title: "ZigZag Conversion", difficulty: "Medium" },
//   { id: 7, title: "Reverse Integer", difficulty: "Medium" },
//   { id: 8, title: "String to Integer (atoi)", difficulty: "Medium" },
//   { id: 9, title: "Palindrome Number", difficulty: "Easy" },
//   { id: 10, title: "Regular Expression Matching", difficulty: "Hard" },
//   { id: 11, title: "Container With Most Water", difficulty: "Medium" },
//   { id: 12, title: "Integer to Roman", difficulty: "Medium" },
// ];

export default function DisplayProblems({
  problems,
}: {
  problems: problemsType[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem,
  );

  const totalPages = Math.ceil(problems.length / problemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Problem List</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[150px]">Solution</TableHead>
              <TableHead className="w-[100px]">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProblems.map((problem) => (
              <DisplayProblem key={problem.problemNumber} problem={problem} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="w-24"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Prev
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="w-24"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
