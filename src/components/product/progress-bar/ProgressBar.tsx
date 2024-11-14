import React from "react";

const STEPS = ["Product", "Add-ons", "Review"];

export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {STEPS.map(step => (
          <div key={step} className="text-sm font-medium">
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-qopla-green rounded-full transition-all duration-300"
          style={{ width: currentStep === 1 ? "1%" : `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
