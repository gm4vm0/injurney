"use client";

import { Lato } from "next/font/google";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const latoNormal = Lato({ subsets: ["latin"], weight: "400" });

interface UserProfile {
  name: string;
  medicalCondition: string;
  age: number;
  height: number;
  weight: number;
}

const ProfilePage = () => {
  //const [profile, setProfile] = useState<UserProfile | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: "Amy Lee",
    medicalCondition: "Sprained ankle",
    age: 61,
    height: 165,
    weight: 58,
  });

  /* Comment useEffect hook since we're hardcoding user profile

  useEffect(() => {
    const userEmail = "test@email.com";

    const fetchData = async () => {
      const res = await fetch(`/api/user/${encodeURIComponent(userEmail)}`);
      if (!res.ok) {
        console.error("Failed to fetch user profile");
        return;
      }
      const data = await res.json();
      setProfile(data);
    };

    fetchData();
  }, []);

  if (!profile) {
    return (
      <h1
        className={`${latoNormal.className} text-2xl text-highlight flex flex-col items-center justify-center h-screen p-16`}
      >
        Loading profile...
      </h1>
    );
  }
  */

  return (
    <div>
      <Navbar />
      <div className="mt-10 flex-1">
        <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            User Profile
          </h1>
          <div className="space-y-2">
            <p className="font-semibold">
              <span className="text-gray-600">Name:</span> {profile.name}
            </p>
            <p className="font-semibold">
              <span className="text-gray-600">Medical Condition:</span>{" "}
              {profile.medicalCondition}
            </p>
            <p className="font-semibold">
              <span className="text-gray-600">Age:</span> {profile.age}
            </p>
            <p className="font-semibold">
              <span className="text-gray-600">Height:</span> {profile.height} cm
            </p>
            <p className="font-semibold">
              <span className="text-gray-600">Weight:</span> {profile.weight} kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
