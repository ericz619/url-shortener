"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

async function createUrl(url: string) {
  const res = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

export default function ShortenForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [inputUrl, setInputUrl] = useState<string | null>();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputUrl) {
      // # create short url
      const { data, statusCode, error } = await createUrl(inputUrl);

      if (statusCode == 200) {
        // # redirect user to success page with the code
        router.push(`/success?code=${data.code}`);
        setError(null);
      } else {
        setError(error.message);
      }
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputUrl(e.target.value);

  return (
    <form
      className="max-w-[600px] w-full flex justify-center my-4 mx-auto"
      onSubmit={handleOnSubmit}
    >
      <div className="flex flex-col w-full relative">
        <input
          type="text"
          placeholder="Enter a URL"
          className={`border border-solid p-4 rounded-l-lg w-full ${
            error && "border-rose-600"
          }`}
          onChange={handleOnChange}
          required
        />

        {error && (
          <div className="text-xs text-pink-600 my-2 absolute top-14">
            {error}
          </div>
        )}
      </div>

      <input
        type="submit"
        className="bg-sky-700 font-bold text-white p-4 rounded-r-lg cursor-pointer"
        value="Shorten URL"
      />
    </form>
  );
}
