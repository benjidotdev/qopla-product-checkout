import React from "react";

interface ProgressButtonsProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  disableNext: boolean;
  handleSubmit: () => void;
}

const ProgressButtons = ({
  currentStep,
  setCurrentStep,
  totalSteps,
  disableNext,
  handleSubmit,
}: ProgressButtonsProps) => {
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex gap-6">
      {currentStep > 1 && (
        <button className="w-full  hover:bg-gray-100 border font-bold p4 rounded-lg" onClick={() => handleBackStep()}>
          Back
        </button>
      )}
      <button
        className={`w-full bg-qopla-green hover:bg-qopla-green-dark text-qopla-gold border border-qopla-gold font-bold p-4 rounded-lg`}
        onClick={() => handleNextStep()}
        disabled={disableNext}
      >
        {currentStep < totalSteps ? "Next" : "Add to order"}
      </button>
    </div>
  );
};

export default ProgressButtons;
