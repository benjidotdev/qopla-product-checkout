import React, { useEffect, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import LoadingIndicator from "../indicators/loading-indicator/LoadingIndicator";
import ErrorIndicator from "../indicators/error-indicator/ErrorIndicator";
import ProgressBar from "./progress-bar/ProgressBar";
import ProductStep from "./steps/product-step/ProductStep";
import { Flavour, Size } from "../../types/products";
import ProgressButtons from "./progress-buttons/ProgressButtons";

const Soda = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>({ name: "", addonPrice: 0 });
  const [selectedFlavor, setSelectedFlavor] = useState<Flavour>({ name: "", addonPrice: 0 });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const basePriceRef = useRef<number>(0);

  // Sets defaults
  useEffect(() => {
    if (product) {
      basePriceRef.current = product.price;
      setSelectedSize(product.modifications.sizes[0]);
      setSelectedFlavor(product.modifications.flavours[0]);
      setTotalPrice(product.price);
    }
  }, [product]);

  // Updates total price
  useEffect(() => {
    if (product) {
      const sizeAddonPrice = product.modifications.sizes.find(size => size.name === selectedSize.name)?.addonPrice || 0;
      setTotalPrice(basePriceRef.current + sizeAddonPrice);
    }
  }, [selectedSize, product]);

  const getCurrentStepComponent = () => {
    if (!product) return null;
    switch (currentStep) {
      case 1:
        return (
          <ProductStep
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
          />
        );
      case 2:
        return (
          <ProductStep
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
          />
        );
      case 3:
        return (
          <ProductStep
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
          />
        );
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="flex flex-col bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6 gap-6">
      <ProgressBar currentStep={currentStep} />
      <div className="flex">
        <div className="w-3/4">{getCurrentStepComponent()}</div>
        <div className="w-1/4">{selectedSize.name} {selectedFlavor.name} - {totalPrice}</div>
      </div>
      <ProgressButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={3}
        disableNext={false}
        handleSubmit={() => {}}
      />
    </div>
  );
};

export default Soda;
