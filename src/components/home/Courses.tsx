"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    title: "Data Structures",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    title: "Algorithms",
    image: "/placeholder.svg?height=100&width=200",
  },
];

const Courses = () => {
  return (
    <section className="mb-8 sm:mb-12">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover rounded-md"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Courses;
