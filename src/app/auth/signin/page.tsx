"use client";

import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

const latoNormal = Lato({ subsets: ["latin"], weight: "400" });
const latoBold = Lato({ subsets: ["latin"], weight: "700" });

export default function SignIn() {
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.email == "test@email.com" && formData.password == "test123") {
      setUser({
        name: "Amy Lee",
        email: "test@email.com",
        age: 64,
        height: 162,
        weight: 58,
      });
      router.replace("/");
    }
    setIsSubmitting(false);
    setMessage("Wrong credentials");
  };

  return (
    <main
      className={`${latoNormal.className} text-highlight flex flex-col items-center justify-center h-screen p-16`}
    >
      <h1 className="text-4xl text-center">
        Welcome to <span className={latoBold.className}>Injurney</span>.
      </h1>
      <h3 className="mt-4 text-center">
        Revolutionizing your track to recovery.
      </h3>

      <div className="mt-4">
        <Image
          src="/injurney.png"
          alt="Injurney Logo"
          width={150}
          height={150}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2.5 mt-4"
      >
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="px-2 py-1 bg-transparent border-2 rounded-lg w-52 border-highlight placeholder-highlight focus:outline-none"
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="px-2 py-1 bg-transparent border-2 rounded-lg w-52 border-highlight placeholder-highlight focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-1 bg-transparent border-2 rounded-lg w-52 border-highlight placeholder-highlight focus:outline-none"
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
        {message != "" && message}
      </form>
      <p className="mt-4">
        First time? <span className="underline">Create an account</span>
      </p>
      <p className="underline">Forgot Password</p>
    </main>
  );
}
