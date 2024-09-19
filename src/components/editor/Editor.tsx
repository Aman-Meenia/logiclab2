"use client";
import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import CodeEditorHeader from "./CodeEditorHeader";
import Testcase from "../testcase/Testcase";

export type defaultTestCaseType = {
  testCase1: string;
  testCase2: string;
  testCase3: string;
};

export type defaultCodeType = {
  cppCode: string;
  tsCode: string;
  jsCode: string;
};

export type languageType = {
  name: string;
  code: number;
  defaultCode: string;
  submitCode: string;
};
// const outputType:
export type outputType = {
  status?: string;
  error?: boolean;
  errorMessage?: string;
  time?: string;
  memory?: string;
  stdout?: string;
  testCaseResult?: [boolean];
  compile_output?: string;
};

const Editor = ({
  defaultTestCase,
  defaultCode,
}: {
  defaultTestCase: defaultTestCaseType;
  defaultCode: defaultCodeType;
}) => {
  const languages: languageType[] = [
    {
      name: "Cpp",
      code: 54,
      defaultCode: defaultCode.cppCode,
      submitCode: "cpp",
    },
    {
      name: "Js",
      code: 63,
      defaultCode: defaultCode.jsCode,
      submitCode: "js",
    },
    {
      name: "Ts",
      code: 74,
      defaultCode: defaultCode.tsCode,
      submitCode: "ts",
    },
  ];

  const editorRef = useRef<HTMLInputElement | null>(null);
  const [langName, setLangName] = useState<languageType>(languages[0]);
  const [userCode, setUserCode] = useState<string>(languages[0].defaultCode);
  const [userCodeOutput, setUserCodeOutput] = useState<outputType | null>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, [langName]);

  console.log("<---------- USER CODE OUTPUT_------------>");
  console.log(userCodeOutput);
  return (
    <>
      <div className="   bg-[rgba(13,17,23)] flex flex-col  w-1/2 h-[min(100vh-60px)] p-1 rounded-sm">
        <div className=" bg-black  h-1/2  rounded-sm flex flex-col ">
          <CodeEditorHeader
            langName={langName}
            setLangName={setLangName}
            languages={languages}
            setUserCode={setUserCode}
            userCode={userCode}
            setUserCodeOutput={setUserCodeOutput}
          />
          <CodeEditor
            langName={langName}
            editorRef={editorRef}
            userCode={userCode}
            setUserCode={setUserCode}
          />
        </div>
        <div className="h-1/2 bg-[rgba(13,17,23)] overflow-y-auto pt-1 ">
          <Testcase
            defaultTestCase={defaultTestCase}
            userCodeOutput={userCodeOutput}
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
