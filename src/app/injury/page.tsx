"use client";
import { useState, FormEvent } from "react";
import Navbar from "../../components/Navbar";

const InjuryPage = () => {
  const [injuryDescription, setInjuryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [userId, setUserId] = useState("");

  const [injuryType, setInjuryType] = useState("");
  const [severity, setSeverity] = useState("");
  const [medicationTaken, setMedicationTaken] = useState("");
  const [targetHabits, setTargetHabits] = useState("");

  // State to track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Go to next/prev step
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPrevStep = () =>
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("api/analyze-injury", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          injuryDescription,
          userId,
          injuryType,
          severity,
          medicationTaken,
          targetHabits,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data.result); // Adjust
    } catch (error) {
      console.error("There was an error analyzing the injury:", error);
      setResult("Failed to analyze injury. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-1">
        <div className="max-w-lg mx-auto my-8">
          <h1 className="text-xl font-bold text-center mb-6 text-white">
            Analyze Your Injury
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
                value={injuryDescription}
                onChange={(e) => setInjuryDescription(e.target.value)}
                placeholder="Describe your injury..."
                required
              ></textarea>
            )}

            {currentStep === 2 && (
              <>
                <select
                  className="w-full p-4 mt-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
                  value={injuryType}
                  onChange={(e) => setInjuryType(e.target.value)}
                  required
                >
                  <option value="">Select Injury Type</option>
                  <option value="Strained Muscles">Strained Muscles</option>
                  <option value="Broken Arm/Leg">Broken Arm/Leg</option>
                  <option value="Sprained Ankle">Sprained Ankle</option>
                </select>

                <select
                  className="w-full p-4 mt-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  required
                >
                  <option value="">Injury Severity</option>
                  <option value="Severe">Severe</option>
                  <option value="Mild">Mild</option>
                </select>
              </>
            )}

            {currentStep === 3 && (
              <>
                <input
                  className="w-full p-4 mt-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
                  type="text"
                  value={medicationTaken}
                  onChange={(e) => setMedicationTaken(e.target.value)}
                  placeholder="Medication Taken"
                />
                <input
                  className="w-full p-4 mt-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 transition-colors"
                  type="text"
                  value={targetHabits}
                  onChange={(e) => setTargetHabits(e.target.value)}
                  placeholder="Target Habits"
                />
              </>
            )}

            <div className="flex flex-col space-y-2">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {loading ? "Analyzing..." : "Submit"}
                </button>
              )}

              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          </form>

          {result && currentStep === 4 && (
            <div className="mt-6">
              <h2>Analysis Result:</h2>
              {result.split("\n").map((line, index) => (
                <p key={index} className="text-sm">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InjuryPage;
