import React from "react";
import { Product, Size, Flavour } from "../../../../types/products";
import SizeSelector from "./size-selector/SizeSelector";
import FlavorSelector from "./flavour-selector/FlavorSelector";

interface ProductStepProps {
  product: Product;
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
  selectedFlavor: Flavour;
  setSelectedFlavor: (flavor: Flavour) => void;
}

const ProductStep = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedFlavor,
  setSelectedFlavor,
}: ProductStepProps) => {
  const handleSizeSelect = (size: Size) => {
    setSelectedSize(size);
  };

  const handleFlavorSelect = (flavor: Flavour) => {
    setSelectedFlavor(flavor);
  };

  const flavors = product.modifications.flavours;
  const sizes = product.modifications.sizes;
  const currentIndex = sizes.indexOf(selectedSize);
  const nextSize = sizes[currentIndex + 1];

  return (
    <div className="space-y-6 whitespace-nowrap">
      <SizeSelector sizes={sizes} selectedSize={selectedSize} nextSize={nextSize} handleSizeSelect={handleSizeSelect} />
      <FlavorSelector flavors={flavors} selectedFlavor={selectedFlavor} handleFlavorSelect={handleFlavorSelect} />
    </div>
  );
};

export default ProductStep;
