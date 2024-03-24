import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    medicalCondition: "",
    age: "",
    height: "",
    weight: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Checks if a user ID already exists in localStorage, otherwise generate a new one
    const existingUserId = localStorage.getItem("userId");
    if (!existingUserId) {
      const newUserId = uuidv4();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    } else {
      setUserId(existingUserId);
    }
  }, []);

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

    const dataToSubmit = { ...formData, userId };

    try {
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setMessage(result.message || "Preferences saved successfully!");
    } catch (error) {
      console.error("Failed to save user's preferences", error);
      setMessage("Failed to save preferences. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Welcome! Let&apos;s get to know you.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="medicalCondition"
          value={formData.medicalCondition}
          onChange={handleChange}
          placeholder="Medical Condition"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          required
        />
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LandingPage;
