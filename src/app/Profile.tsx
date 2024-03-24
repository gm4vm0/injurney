import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';

interface UserProfile {
  name: string;
  medicalCondition: string;
  age: number;
  height: number;
  weight: number;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Replace 'user@example.com' with the actual logged-in user's email
    const userEmail = "user@example.com";

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
    return <div>Loading profile...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1">
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
