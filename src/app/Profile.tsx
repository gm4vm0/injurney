import { useEffect, useState } from 'react';

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
    const userEmail = 'user@example.com'; 

    const fetchData = async () => {
      const res = await fetch(`/api/user/${encodeURIComponent(userEmail)}`);
      if (!res.ok) {
        console.error('Failed to fetch user profile');
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
    <div>
      <h1>User Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Medical Condition: {profile.medicalCondition}</p>
      <p>Age: {profile.age}</p>
      <p>Height: {profile.height} cm</p>
      <p>Weight: {profile.weight} kg</p>
    </div>
  );
};

export default ProfilePage;
