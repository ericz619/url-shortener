import { Inter } from "@next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div
          className={`relative h-full w-full flex justify-center items-center ${inter.className}`}
        >
          <div className="flex flex-col shadow-2xl p-4 w-[798px] mx-auto rounded-lg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
