"use client";
import React, { useEffect, useState } from "react";
import { outputType } from "../editor/Editor";
import { testCaseType } from "./Testcase";
import RenderTestCaseInput from "./RenderTestCaseInput";

const RenderTestCaseOutput = ({
  userCodeOutput,
  testCaseInput,
  cases,
}: {
  userCodeOutput: outputType | null;
  testCaseInput: testCaseType;
  cases: testCaseType[];
}) => {
  // useEffect(() => {
  console.log("<----- Render output testcase -------->");
  console.log(testCaseInput);
  console.log(userCodeOutput);
  const [testCase, setTestCase] = useState<testCaseType[]>(cases);
  const [selectedTestcase, setSelectedTestCase] = useState<number>(1);
  // }, [userCodeOutput]);
  const getUserOutputValues = () => {
    if (userCodeOutput?.stdout) {
      const parts = userCodeOutput.stdout.split("$$$");

      // Trim each part to remove any unnecessary newlines or whitespace
      const values = parts
        .map((part) => part.trim())
        .filter((part) => part !== "");
      return values;
    }
    return ["", "", ""];
  };

  const addUserOutputToTestcase = () => {
    const values = getUserOutputValues();

    const TestCase: testCaseType =
      selectedTestcase === 3
        ? cases[2]
        : selectedTestcase === 2
          ? cases[1]
          : cases[0];

    let actualTestCase = TestCase.code;
    actualTestCase = actualTestCase.replace("##### Output", "##### Expected");
    const userOutputForSelectedTestCase = `##### Output \n \`\`\`  \n${values[TestCase.id - 1]}\n\`\`\`\n`;

    return actualTestCase + userOutputForSelectedTestCase;
  };
  console.log(" userCodeStatus " + userCodeOutput?.status);

  let CompilationError = userCodeOutput?.compile_output || "COMPILATION ERROR";

  CompilationError = ` \`\`\`${CompilationError} \`\`\`\n`;

  return (
    <>
      {userCodeOutput?.status === "Accepted" ? (
        <div className="pt-3 pl-3 text-xl text-green-400 ">Accepted</div>
      ) : userCodeOutput?.status === "Wrong Answer" ? (
        <div className="pt-3 pl-3 text-xl text-red-400 ">Wrong Answer</div>
      ) : (
        <></>
      )}
      {userCodeOutput?.status === "Accepted" ||
      userCodeOutput?.status === "Wrong Answer" ? (
        <>
          <div className="flex  gap-2 pt-3 pb-4 ">
            {testCase.map((testCase: testCaseType) => (
              <div
                key={testCase.id}
                className={`${
                  selectedTestcase === testCase.id
                    ? " bg-[rgba(22,27,34)]  rounded-md cursor-default"
                    : "cursor-pointer"
                } px-2 py-1`}
                onClick={() => {
                  if (selectedTestcase !== testCase.id) {
                    setSelectedTestCase(testCase.id);
                    console.log("Case " + testCase.id);
                  }
                }}
              >
                {"Case " + testCase.id}
              </div>
            ))}
          </div>

          <RenderTestCaseInput testCaseInput={addUserOutputToTestcase()} />
        </>
      ) : userCodeOutput?.status === "Compilation Error" ? (
        <>
          <div className="pt-3 pl-3 text-xl text-red-400 ">
            Compilation Error
          </div>
          <RenderTestCaseInput testCaseInput={CompilationError} />
        </>
      ) : userCodeOutput?.status === "Time Limit Exceeded" ? (
        <div className="pt-3 pl-3 text-xl text-red-400 ">
          Time Limit Exceeded
        </div>
      ) : userCodeOutput?.status === "Runtime Error (NZEC)" ? (
        <>
          <div className="pt-3 pl-3 text-xl text-red-400 ">Runtime Error</div>
          <RenderTestCaseInput testCaseInput={CompilationError} />
        </>
      ) : (
        <div> ERROR</div>
      )}
    </>
  );
};

export default RenderTestCaseOutput;
