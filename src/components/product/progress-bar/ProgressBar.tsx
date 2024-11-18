import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEPS = ["Product", "Add-ons", "Review"];

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const stepsToDisplay = totalSteps === 2 ? STEPS.filter(step => step !== "Add-ons") : STEPS;
  const progressWidth = currentStep === 1 ? "1%" : `${((currentStep - 1) / (stepsToDisplay.length - 1)) * 100}%`;

  return (
    <div className="mb-2">
      <div className="flex justify-between mb-2">
        {stepsToDisplay.map(step => (
          <div key={step} className="text-sm font-medium">
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-qopla-green rounded-full transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
