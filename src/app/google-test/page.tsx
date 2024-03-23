"use client";

import useGoogle from "@/utils/useGoogle";

export default function Home() {
  useGoogle();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bold">Test Google</h1>
      <div id="content"></div>
    </main>
  );
}
