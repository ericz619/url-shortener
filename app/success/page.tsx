import React from "react";
import { CopyBoard } from "@/components/index";

type SuccessPageProps = {
  searchParams: {
    code: string;
  };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { code } = searchParams;

  return (
    <>
      <h1 className="text-4xl text-slate-700 my-4 text-center">
        Copy your Shorten URL
      </h1>

      <CopyBoard code={code} />
    </>
  );
}
