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

const Product = () => {
  const { product, additionalData, loading, error } = useProduct({ id: "a_very_unique_soda_id" });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>({ name: "", addonPrice: 0 });
  const [selectedFlavour, setSelectedFlavour] = useState<Flavour>({ name: "", addonPrice: 0 });
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOnGroup[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const basePriceRef = useRef<number>(0);

  // Sets defaults
  useEffect(() => {
    if (product) {
      basePriceRef.current = product.price;
      setSelectedSize(product.modifications.sizes[0]);
      setSelectedFlavour(product.modifications.flavours[0]);
      setTotalPrice(product.price);
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
    alert(
      `Order Summary:\n\n` +
      `Size: ${order.size}\n` +
      `Flavor: ${order.flavor}\n` +
      `Add-ons:\n` +
      `  ${order.addOns.map(group => {
        return `${group.groupTitle}:\n` +
          `    ${group.addons.map(addon => `- ${addon.name}`).join('\n    ')}`
      }).join('\n  ')}\n` +
      `Total Price: ${order.totalPrice.toFixed(2)} SEK`
    );
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
      case 3:
        return (
          <Overview
            selectedSize={selectedSize}
            selectedFlavour={selectedFlavour}
            selectedAddOns={selectedAddOns}
            totalPrice={totalPrice}
          />
        );
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator error={error} />;

  return (
    <div className="flex flex-col bg-white w-full max-w-4xl h-full max-h-[80%] rounded-xl shadow-2xl p-6 my-12 gap-6">
      <ProgressBar currentStep={currentStep} />
      <div className="flex-1 flex gap-6 overflow-y-scroll">
        {currentStep !== 3 && <div className="w-3/4">{getCurrentStepComponent()}</div>}
        <div className="sticky top-0 w-1/4">
        <Overview
            selectedSize={selectedSize}
            selectedFlavour={selectedFlavour}
            selectedAddOns={selectedAddOns}
            totalPrice={totalPrice}
          />
        </div>
      </div>
      <ProgressButtons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        totalSteps={3}
        disableNext={false}
        handleSubmit={() => handleSubmit()}
      />
    </div>
  );
};

export default Product;
