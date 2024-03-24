"use client";

import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Hello {user.name}</h1>
    </div>
  );
}
