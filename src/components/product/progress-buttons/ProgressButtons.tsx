import React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressButtonsProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  disableNext: boolean;
  handleSubmit: () => void;
  handleBackStep: () => void;
}

const ProgressButtons = ({
  currentStep,
  setCurrentStep,
  totalSteps,
  disableNext,
  handleSubmit,
  handleBackStep,
}: ProgressButtonsProps) => {
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-6">
      <AnimatePresence mode="wait">
        {currentStep > 1 && (
          <motion.div
            key="back-button-container"
            className="flex-shrink-0"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "25%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              width: { duration: 0.5, ease: "easeOut" },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <button className="hover:bg-gray-100 border font-bold p-4 rounded-lg w-full" onClick={handleBackStep}>
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        key="next-button"
        className={clsx(
          currentStep > 1 ? "flex-grow" : "w-full",
          "bg-qopla-green hover:bg-qopla-green-dark text-qopla-gold border border-qopla-gold font-bold p-4 rounded-lg",
        )}
        onClick={handleNextStep}
        disabled={disableNext}
        initial={{ width: "100%" }}
        animate={{ width: currentStep > 1 ? "75%" : "100%" }}
        exit={{ width: currentStep > 1 ? "75%" : "100%" }}
        transition={{
          width: { duration: 0.5, ease: "easeOut" },
          opacity: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {currentStep < totalSteps ? "Next" : "Add to order"}
      </motion.button>
    </div>
  );
};

export default ProgressButtons;
