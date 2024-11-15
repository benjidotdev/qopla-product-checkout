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
        <button
          className="w-full  hover:bg-gray-100 border font-bold py-3 px-4 rounded"
          onClick={() => handleBackStep()}
        >
          Back
        </button>
      )}
      <button
        className={`w-full bg-qopla-green hover:bg-qopla-green-dark text-qopla-gold border-qopla-gold font-bold py-3 px-4 rounded`}
        onClick={() => handleNextStep()}
        disabled={disableNext}
      >
        {currentStep < totalSteps ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default ProgressButtons;
