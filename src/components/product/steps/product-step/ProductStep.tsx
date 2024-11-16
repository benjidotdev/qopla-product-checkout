import React from "react";
import { Product, Size, Flavour } from "../../../../types/products";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../constants";

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

  const sizes = product.modifications.sizes;
  const currentIndex = sizes.indexOf(selectedSize);
  const nextSize = sizes[currentIndex + 1];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Select size</h2>
        <div
          className={`grid grid-rows-1 gap-4`}
          style={{
            gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
          }}
        >
          {sizes.map((size: Size) => (
            <button
              key={size.name}
              onClick={() => handleSizeSelect(size)}
              className={clsx(
                "p-4 border rounded-lg transition-colors",
                selectedSize === size
                  ? "bg-qopla-green border-qopla-gold text-qopla-gold"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600",
              )}
            >
              <p className="font-bold">{size.name}</p>
              {size.addonPrice !== 0 && (
                <p className={clsx("text-xs", selectedSize === size ? "text-qopla-gold" : "text-gray-600")}>
                  {size.addonPrice > 0 && "+"}
                  {size.addonPrice} {CURRENCY_CODE}
                </p>
              )}
            </button>
          ))}
        </div>
        {nextSize && (
          <p className="text-sm text-gray-600 mt-4">
            <span>Upsell:&nbsp;</span>
            <span className="italic">
              "Would you like to make that a {nextSize.name} for only {nextSize.addonPrice - selectedSize.addonPrice} {CURRENCY_CODE} more?"
            </span>
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Select flavour</h2>
        <div className="grid grid-rows-1 gap-4">
          {product.modifications.flavours.map((flavour: Flavour) => (
            <button
              key={flavour.name}
              onClick={() => handleFlavorSelect(flavour)}
              className={clsx(
                "px-2 py-4 border rounded-lg transition-colors",
                selectedFlavor === flavour
                  ? "bg-qopla-green border-qopla-gold text-qopla-gold"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600",
              )}
            >
              <p className="font-bold">{flavour.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStep;
