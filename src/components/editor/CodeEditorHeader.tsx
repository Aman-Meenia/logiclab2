"use client";
import React, { useState } from "react";
import { ChevronDown, Loader2, Play, Send } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languageType, outputType } from "./Editor";
import axios from "axios";

const CodeEditorHeader = ({
  langName,
  setLangName,
  languages,
  userCode,
  setUserCode,
  setUserCodeOutput,
}: {
  langName: languageType;
  setLangName: React.Dispatch<React.SetStateAction<languageType>>;
  languages: languageType[];
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  setUserCodeOutput: React.Dispatch<React.SetStateAction<outputType | null>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState<"run" | "submit">("run");
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  const runCode = async (flagIs: "run" | "submit") => {
    setLoading(true);
    const response = await axios
      .post(`${domain}/api/submission`, {
        language: langName.submitCode,
        code: userCode,
        problemId: 1,
        userId: "66879fd73f90b0ed8b11aac5",
        problemTitle: "Longest-Palindrome-Substring",
        flag: flagIs,
      })
      .then((res) => {
        if (res?.data?.success === "true") {
          console.log(res?.data?.messages[0]);
          return res?.data?.messages[0]?.uniqueId;
        }
        setLoading(false);
        console.log(res);
        return "";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        return "";
      });

    console.log("RESPONSE is " + response);
    if (response) {
      for (let i = 10; i >= 1; i--) {
        console.log("i is " + i);
        await new Promise((resolve) => setTimeout(resolve, i * 1000));

        const res = await axios
          .post(`${domain}/api/submission-polling`, {
            uniqueId: response,
          })
          .then((res) => {
            console.log(res);
            if (res?.data?.success === "true") {
              if (
                res?.data?.messages[0]?.status === "Accepted" ||
                res?.data?.messages[0]?.status === "Wrong Answer" ||
                res?.data?.messages[0]?.status === "Compilation Error" ||
                res?.data?.messages[0]?.status === "Runtime Error (NZEC)" ||
                res?.data?.messages[0]?.status === "Time Limit Exceeded"
              ) {
                console.log("<----------- STATUS IS ------------>");
                console.log(res?.data?.messages[0]?.status);
                setUserCodeOutput(res.data.messages[0]);
                return res.data;
              }
            }
            return false;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });

        if (res !== false) {
          setLoading(false);
          break;
        }
      }
    }
    setLoading(false);
  };

  const handleCodeSubmit = async () => {
    // e.preventDefault();
    setFlag("submit");
    runCode("submit");
  };

  const handleCodeRun = async () => {
    // e.preventDefault();
    setFlag("run");
    runCode("run");
  };

  // console.log("code " + userCode);
  return (
    <div className="flex justify-between items-center gap-2 py-2 px-3 h-10 rounded-sm bg-[rgba(13,30,50)] text-gray-300">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between bg-[rgba(13,30,50)] hover:text-white cursor-pointer">
            <span>{langName.name}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0 bg-[rgba(13,30,45)] border border-gray-700">
          <div className="max-h-[300px] overflow-y-auto">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="w-full justify-start font-normal hover:bg-[rgba(13,30,50)] hover:text-white p-2 cursor-pointer"
                onClick={() => {
                  setLangName(lang);
                  setIsOpen(false);
                  setUserCode(lang.defaultCode);
                }}
              >
                {lang.name}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex gap-2 p-2">
        <button
          onClick={handleCodeRun}
          className={`flex bg-[#10B981] hover:bg-[#0E9F6E] text-white text-sm px-3 py-1 rounded `}
          disabled={loading}
        >
          {loading && flag === "run" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />

              <span>Pending...</span>
            </>
          ) : (
            <>
              <Play className="mr-1 h-5 w-5" />
              <span>Run</span>
            </>
          )}
        </button>
        <button
          onClick={handleCodeSubmit}
          className="flex bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm px-3 py-1 rounded"
          disabled={loading}
        >
          {loading && flag === "submit" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Pending...</span>
            </>
          ) : (
            <>
              <Send className="mr-1 h-5 w-5 " />
              <span>Submit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditorHeader;
