import HomePage from "@/components/home/HomePage";
import Link from "next/link";
import axios from "axios";

export type problemsType = {
  problemNumber: number;
  difficulty: "easy" | "medium" | "hard";
  problemName: string;
  problemTitle: string;
};

const domain = process.env.NEXT_PUBLIC_DOMAIN;

async function fetchProblems() {
  const problems = await axios
    .get(`${domain}/api/problem?start=1&end=100`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return problems;
}

const Home = async function () {
  const data = await fetchProblems();
  console.log("<------------------Problems------------------->");
  console.log(data);

  const problems: problemsType[] = data?.messages[0]?.problems;
  console.log(problems);

  if (data?.success === "false") {
  } else {
    return (
      <>
        <HomePage problems={problems} />
      </>
    );
  }
};

export default Home;
