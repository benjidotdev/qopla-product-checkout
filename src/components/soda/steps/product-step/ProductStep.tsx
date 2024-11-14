import React from "react";
import { Product, Size, Flavour } from "../../../../types/products";

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose your size</h2>
        <div className="grid grid-cols-2 gap-4">
          {product.modifications.sizes.map((size: Size) => (
            <button
              key={size.name}
              onClick={() => handleSizeSelect(size)}
              className={`p-4 border rounded-lg transition-colors ${
                selectedSize === size ? "bg-qopla-gold border-qopla-green" : "hover:bg-gray-50"
              }`}
            >
              <p className="font-medium">{size.name}</p>
              {size.addonPrice > 0 && <p className="text-sm text-gray-600">+${size.addonPrice}</p>}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Select your flavor</h2>
        <div className="grid grid-cols-2 gap-4">
          {product.modifications.flavours.map((flavor: Flavour) => (
            <button
              key={flavor.name}
              onClick={() => handleFlavorSelect(flavor)}
              className={`p-4 border rounded-lg transition-colors ${
                selectedFlavor === flavor ? "bg-qopla-gold border-qopla-green" : "hover:bg-gray-50"
              }`}
            >
              {flavor.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStep;
