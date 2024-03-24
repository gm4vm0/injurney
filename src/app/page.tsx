"use client";

import "./calendar.css";
import Navbar from "../components/Navbar";

import { Lato } from "next/font/google";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import Cal from "./Calendar";

const latoBold = Lato({ subsets: ["latin"], weight: "900" });

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/signin");
    }
  }, [router, user]);

  return (
    <div>
      <Navbar />
    <div>
      {user && (
        <div className="flex flex-col items-start justify-center text-highlight p-11">
          <div className={`${latoBold.className} h-32`}>
            <h1 className="text-2xl">Hello,</h1>
            <h1 className="text-4xl">{user.name.split(" ")[0]}.</h1>
          </div>
          <Cal className="w-full p-5 text-center bg-highlight text-darkgreen rounded-xl" />
          <div className={`${latoBold.className} mt-20`}>
            <h1 className="text-3xl">Overview</h1>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
