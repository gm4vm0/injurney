"use client";

import { FormEvent, useState } from "react";
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    setResult(`
1. Rest and Elevation: Prioritize rest for your sprained ankle, especially during the acute phase of the injury. Elevating the ankle above heart level whenever possible helps reduce swelling and promotes healing.

2. Ice Therapy: Applying ice packs to the injured ankle for 15-20 minutes every few hours can help alleviate pain and swelling. It's essential to wrap the ice pack in a cloth to prevent ice burn.

3. Light Cardio Alternatives: Since Amy wants to maintain light cardio, she can consider low-impact activities that minimize strain on the ankle. Options include swimming, water aerobics, stationary cycling, or using an elliptical trainer.

4. Gradual Progression: Start with activities that don't aggravate your ankle and gradually increase intensity as tolerated. Listen to your body and avoid activities that cause pain is crucial for safe progression.

5. Footwear: Supportive and well-cushioned shoes with good arch support are essential for ankle stability and shock absorption. Avoid high heels and shoes that exacerbate discomfort.
`);
    goToNextStep();
    setLoading(false);

    // try {
    //   const response = await fetch("/api/analyze-injury", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       injuryDescription,
    //       userId,
    //       injuryType,
    //       severity,
    //       medicationTaken,
    //       targetHabits,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = await response.json();
    //   setResult(data.result); // Adjust
    // } catch (error) {
    //   console.error("There was an error analyzing the injury:", error);
    //   setResult("Failed to analyze injury. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div>
      <Navbar />
      <div className="flex-1 p-11">
        <div className="max-w-lg mx-auto my-8">
          <h1 className="mb-6 text-4xl font-bold text-center text-white">
            Analyze Your Injury
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <textarea
                className="w-full p-4 transition-colors border-2 border-gray-300 rounded-lg focus:border-highlight focus:outline-none"
                value={injuryDescription}
                onChange={(e) => setInjuryDescription(e.target.value)}
                placeholder="Describe your injury..."
                required
              ></textarea>
            )}

            {currentStep === 2 && (
              <>
                <select
                  className="w-full p-4 transition-colors border-2 border-gray-300 rounded-lg focus:border-highlight focus:outline-none"
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
                  className="w-full p-4 transition-colors border-2 border-gray-300 rounded-lg focus:border-highlight focus:outline-none"
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
                  className="w-full p-4 transition-colors border-2 border-gray-300 rounded-lg focus:border-highlight focus:outline-none"
                  type="text"
                  value={medicationTaken}
                  onChange={(e) => setMedicationTaken(e.target.value)}
                  placeholder="Medication Taken"
                />
                <input
                  className="w-full p-4 transition-colors border-2 border-gray-300 rounded-lg focus:border-highlight focus:outline-none"
                  type="text"
                  value={targetHabits}
                  onChange={(e) => setTargetHabits(e.target.value)}
                  placeholder="Target Habits"
                />
              </>
            )}

            {currentStep != 4 && (
              <div className="flex flex-col space-y-2">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="w-full py-2 mt-4 transition-colors rounded-lg text-darkgreen bg-highlight"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 mt-4 transition-colors rounded-lg text-darkgreen bg-highlight"
                  >
                    {loading ? "Analyzing..." : "Submit"}
                  </button>
                )}

                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="w-full py-2 mt-4 transition-colors rounded-lg text-darkgreen bg-highlight"
                  >
                    Back
                  </button>
                )}
              </div>
            )}
          </form>

          {currentStep == 4 && (
            <div className="mt-6 text-highlight">
              <h2 className="text-2xl">
                Here are the results of your analysis:
              </h2>
              {result.split("\n").map((line, index) => (
                <p key={index} className="mt-4 text-lg">
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
