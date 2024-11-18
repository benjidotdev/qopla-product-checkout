import React from "react";
import ProductStep from "../product-step/ProductStep";
import AddOnStep from "../add-on-step/AddOnStep";
import { Product, Size, Flavour, SelectedAddOnGroup, AdditionalData } from "../../../../types/products";

interface StepComponentProps {
  currentStep: number;
  product: Product | null;
  additionalData: AdditionalData[] | null;
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
  selectedFlavour: Flavour;
  setSelectedFlavour: (flavour: Flavour) => void;
  selectedAddOns: SelectedAddOnGroup[];
  setSelectedAddOns: (addons: SelectedAddOnGroup[]) => void;
}

const StepComponent: React.FC<StepComponentProps> = ({
  currentStep,
  product,
  additionalData,
  selectedSize,
  setSelectedSize,
  selectedFlavour,
  setSelectedFlavour,
  selectedAddOns,
  setSelectedAddOns,
}) => {
  switch (currentStep) {
    case 1:
      return (
        product && (
          <ProductStep
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedFlavour={selectedFlavour}
            setSelectedFlavour={setSelectedFlavour}
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
    default:
      return null;
  }
};

export default StepComponent;
