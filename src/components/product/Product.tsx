import React, { useEffect, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import LoadingIndicator from "../indicators/loading-indicator/LoadingIndicator";
import ErrorIndicator from "../indicators/error-indicator/ErrorIndicator";
import ProgressBar from "./progress-bar/ProgressBar";
import ProductStep from "./steps/product-step/ProductStep";
import AddOnStep from "./steps/add-on-step/AddOnStep";
import ProgressButtons from "./progress-buttons/ProgressButtons";
import { Flavour, Size, SelectedAddOnGroup } from "../../types/products";
import Overview from "./overview/Overview";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>({ name: "", addonPrice: 0 });
  const [selectedFlavour, setSelectedFlavour] = useState<Flavour>({ name: "", addonPrice: 0 });
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOnGroup[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isBackTransition, setIsBackTransition] = useState<boolean>(false);
  const basePriceRef = useRef<number>(0);

  // Sets defaults
  useEffect(() => {
    if (product) {
      basePriceRef.current = product.price;
      setSelectedSize(product.modifications.sizes[0]);
      setSelectedFlavour(product.modifications.flavours[0]);
      setTotalPrice(product.price);
      setTotalSteps(additionalData ? 3 : 2);
    }
  }, [product]);

  // Updates total price
  useEffect(() => {
    if (product) {
      const sizeAddonPrice = product.modifications.sizes.find(size => size.name === selectedSize.name)?.addonPrice || 0;
      const assortedAddOnPrice = selectedAddOns.reduce((acc, group) => {
        return acc + group.addons.reduce((addonAcc, addon) => addonAcc + addon.price, 0);
      }, 0);
      setTotalPrice(basePriceRef.current + sizeAddonPrice + assortedAddOnPrice);
    }
  }, [product, selectedSize, selectedAddOns]);

  const handleSubmit = () => {
    const order = {
      size: selectedSize.name,
      flavor: selectedFlavour.name,
      addOns: selectedAddOns,
      totalPrice,
    };
    console.log(order);
  };

  const handleBackStep = () => {
    setIsBackTransition(true);
    setCurrentStep(prev => prev - 1);
  };

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          product && (
            <ProductStep
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedFlavor={selectedFlavour}
              setSelectedFlavor={setSelectedFlavour}
            />
          )
        );
      case 2:
        return (
          additionalData && (
            <AddOnStep
              additionalData={additionalData}
              selectedAddOns={selectedAddOns}
              setSelectedAddOns={setSelectedAddOns}
            />
          )
        );
    }
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
              {getCurrentStepComponent()}
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
          />
        </motion.div>
      </div>
      <ProgressButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={totalSteps}
        disableNext={false}
        handleSubmit={handleSubmit}
        handleBackStep={handleBackStep}
      />
    </div>
  );
};

export default Product;
