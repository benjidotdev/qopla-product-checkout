import React from "react";
import useProduct from "../../hooks/useProduct";
import LoadingIndicator from "../indicators/loading-indicator/LoadingIndicator";
import ErrorIndicator from "../indicators/error-indicator/ErrorIndicator";
import ProgressBar from "./progress-bar/ProgressBar";
import ProgressButtons from "./progress-buttons/ProgressButtons";
import Overview from "./overview/Overview";
import StepComponent from "./steps/step-component/StepComponent";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const {
    product,
    additionalData,
    loading,
    error,
    currentStep,
    setCurrentStep,
    selectedSize,
    setSelectedSize,
    selectedFlavour,
    setSelectedFlavour,
    selectedAddOns,
    setSelectedAddOns,
    totalPrice,
    totalSteps,
    isBackTransition,
    setIsBackTransition,
  } = useProduct({ id: "a_very_unique_soda_id" });

  const handleSubmit = () => {
    const order = {
      size: selectedSize.name,
      flavor: selectedFlavour.name,
      addOns: selectedAddOns,
      totalPrice,
    };
    console.log(order);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="flex flex-col bg-white w-full max-w-4xl h-full max-h-[80%] rounded-xl shadow-2xl p-6 my-12 gap-6">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex-1 flex gap-6 overflow-y-scroll">
        <AnimatePresence mode="wait">
          {currentStep !== totalSteps && (
            <motion.div
              key="stepComponent"
              initial={{ width: isBackTransition ? 0 : "66.6667%", opacity: isBackTransition ? 0 : 1 }}
              animate={{ width: "66.6667%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{
                width: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.3, ease: "easeIn" },
              }}
              style={{ overflow: "hidden" }}
              onAnimationComplete={() => setIsBackTransition(false)}
            >
              <StepComponent
                currentStep={currentStep}
                product={product}
                additionalData={additionalData}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedFlavour={selectedFlavour}
                setSelectedFlavour={setSelectedFlavour}
                selectedAddOns={selectedAddOns}
                setSelectedAddOns={setSelectedAddOns}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          key="overview"
          className="sticky top-0"
          initial={{ width: currentStep === totalSteps ? "100%" : "33.3333%" }}
          animate={{ width: currentStep === totalSteps ? "100%" : "33.3333%" }}
          transition={{
            width: { duration: 0.5, ease: "easeIn" },
            opacity: { duration: 0.3, ease: "easeIn" },
          }}
        >
          <Overview
            selectedSize={selectedSize}
            selectedFlavour={selectedFlavour}
            selectedAddOns={selectedAddOns}
            totalPrice={totalPrice}
            additionalData={additionalData ?? []}
          />
        </motion.div>
      </div>
      <ProgressButtons
        currentStep={currentStep}
        setCurrentStep={step => setCurrentStep(step)}
        totalSteps={totalSteps}
        disableNext={false}
        handleSubmit={handleSubmit}
        setIsBackTransition={setIsBackTransition}
      />
    </div>
  );
};

export default Product;
