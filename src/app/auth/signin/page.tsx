"use client";

import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {message != "" && message}
    </form>
  );
}
