"use client";

import { useState } from "react";
import { UserContext } from "@/context/UserContext";

export default function ContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  return (
    <html lang="en">
      <UserContext.Provider value={{ user, setUser }}>
        <body>{children}</body>
      </UserContext.Provider>
    </html>
  );
}
