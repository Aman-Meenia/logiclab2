import React from "react";
import ProblemRenderer from "./ProblemRenderer";
import ProblemHeader from "./ProblemHeader";
import axios from "axios";
import { Link } from "lucide-react";
import Editor from "@/components/editor/Editor";

interface defaultTestCaseType {
  testCase1: string;
  testCase2: string;
  testCase3: string;
}

interface defaultCodeType {
  cppCode: string;
  tsCode: string;
  jsCode: string;
}
// Define the type for problemDescription
interface ProblemDescriptionType {
  description: string;
  defaultTestCase: defaultTestCaseType;
  defaultCode: defaultCodeType;
  _id: string;
  difficulty: string;
  problemName: string;
  problemTitle: string;
}

const problemNotFound: ProblemDescriptionType = {
  description: "Problem not found",
  defaultTestCase: {
    testCase1: "",
    testCase2: "",
    testCase3: "",
  },
  defaultCode: {
    cppCode: "",
    tsCode: "",
    jsCode: "",
  },
  _id: "",
  difficulty: "",
  problemName: "",
  problemTitle: "",
};

async function fetchProblemData(problemName: string) {
  const problemDescription: ProblemDescriptionType = await axios
    .get(`http://localhost:3000/api/problem/${problemName}`)
    .then((response) => {
      if (response.data.success === "true") {
        const data = response.data.messages[0].problem;
        return data;
      }

      return problemNotFound;
    })
    .catch((err) => {
      return problemNotFound;
    });
  return problemDescription;
}

const ProblemPage = async ({ params }: { params: { problemName: string } }) => {
  const problemDescription = await fetchProblemData(params.problemName);
  if (problemDescription.description === "Problem not found") {
    //TODO: Add the custom 404 page
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The requested page does not exist.</p>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </div>
    );
  } else {
    console.log("<------------------Description------------------->");
    // console.log("Problem Description is " + problemDescription);
    // console.log(problemDescription);

    console.log(problemDescription.defaultCode);
    return (
      <div className="flex min-h-[calc(100vh-60px)] p-1 gap-1 bg-black">
        <div className="bg-[rgba(13,17,23)] w-1/2 rounded-sm flex flex-col p-1">
          <ProblemHeader />
          <ProblemRenderer
            problemDescription={problemDescription?.description}
          />
        </div>
        <Editor
          defaultTestCase={problemDescription?.defaultTestCase}
          defaultCode={problemDescription?.defaultCode}
        />
      </div>
    );
  }
};

export default ProblemPage;
