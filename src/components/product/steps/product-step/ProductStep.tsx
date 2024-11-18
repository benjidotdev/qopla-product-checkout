import React from "react";
import { Product, Size, Flavour } from "../../../../types/products";
import SizeSelector from "./size-selector/SizeSelector";
import FlavourSelector from "./flavour-selector/FlavourSelector";

interface ProductStepProps {
  product: Product;
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
  selectedFlavour: Flavour;
  setSelectedFlavour: (flavour: Flavour) => void;
}

const ProductStep = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedFlavour,
  setSelectedFlavour,
}: ProductStepProps) => {
  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
  };

  const handleFlavourSelect = (flavour: Flavour) => {
    setSelectedFlavour(flavour);
  };

  const flavours = product.modifications.flavours;
  const sizes = product.modifications.sizes;
  const currentIndex = sizes.indexOf(selectedSize);
  const nextSize = sizes[currentIndex + 1];

  return (
    <div className="space-y-6 whitespace-nowrap">
      <SizeSelector sizes={sizes} selectedSize={selectedSize} nextSize={nextSize} handleSizeSelect={handleSizeSelect} />
      <FlavourSelector
        flavours={flavours}
        selectedFlavour={selectedFlavour}
        handleFlavourSelect={handleFlavourSelect}
      />
    </div>
  );
};

export default ProductStep;
