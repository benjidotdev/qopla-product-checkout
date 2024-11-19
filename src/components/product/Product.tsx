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
      flavour: selectedFlavour.name,
      addOns: selectedAddOns.map(group => {
        return {
          groupName: group.groupTitle,
          addOns: group.addons.reduce((acc: { name: string; quantity: number }[], addon) => {
            const existingAddon = acc.find(a => a.name === addon.name);
            if (existingAddon) {
              existingAddon.quantity++;
            } else {
              acc.push({ name: addon.name, quantity: 1 });
            }
            return acc;
          }, []),
        };
      }),
      totalPrice,
    };
    console.log(order);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="flex flex-col bg-white w-full md:max-w-3xl lg:w-[80%] lg:max-w-[1280px] h-screen md:max-h-[80%] md:rounded-xl shadow-2xl p-6 my-12 gap-2 md:gap-6">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex flex-1 flex-col md:flex-row md:gap-6 overflow-y-scroll hide-scrollbars">
        <AnimatePresence mode="wait">
          {currentStep !== totalSteps && (
            <motion.div
              key="stepComponent"
              className="hide-scrollbars"
              initial={{
                height: window.innerWidth < 768 ? (isBackTransition ? 0 : "100%") : "auto",
                width: window.innerWidth < 768 ? "100%" : isBackTransition ? 0 : "66.6667%",
                opacity: isBackTransition ? 0 : 1,
              }}
              animate={{
                height: window.innerWidth < 768 ? "100%" : "auto",
                width: window.innerWidth < 768 ? "100%" : "66.6667%",
                opacity: 1,
              }}
              exit={{
                height: window.innerWidth < 768 ? 0 : "auto",
                width: window.innerWidth < 768 ? "100%" : 0,
                opacity: 0,
              }}
              transition={{
                height: { duration: 0.5, ease: "easeIn" },
                width: { duration: 0.5, ease: "easeIn" },
                opacity: { duration: 0.3, ease: "easeIn" },
              }}
              style={{
                overflowX: "hidden",
                overflowY: "auto",
              }}
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
          initial={{
            width: window.innerWidth < 768 || currentStep === totalSteps ? "100%" : "33.3333%",
          }}
          animate={{
            width: window.innerWidth < 768 || currentStep === totalSteps ? "100%" : "33.3333%",
            height: currentStep === totalSteps ? "100%" : "auto",
          }}
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
            finalStep={currentStep === totalSteps}
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
