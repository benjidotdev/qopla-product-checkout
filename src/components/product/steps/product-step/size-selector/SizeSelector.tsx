import React from "react";
import { Size } from "../../../../../types/products";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../../constants";

const SizeOption = ({
  size,
  selected,
  handleSelect,
}: {
  size: Size;
  selected: boolean;
  handleSelect: (size: Size) => void;
}) => {
  return (
    <button
      key={size.name}
      onClick={() => handleSelect(size)}
      className={clsx(
        "p-4 border rounded-lg transition-colors",
        selected ? "bg-qopla-green border-qopla-gold text-qopla-gold" : "bg-gray-100 hover:bg-gray-200 text-gray-600",
      )}
    >
      <p className="font-bold">{size.name}</p>
      {size.addonPrice !== 0 && (
        <p className={clsx("text-xs", selected ? "text-qopla-gold" : "text-gray-600")}>
          {size.addonPrice > 0 && "+"}
          {size.addonPrice} {CURRENCY_CODE}
        </p>
      )}
    </button>
  );
};

const SizeSelector = ({
  sizes,
  selectedSize,
  nextSize,
  handleSizeSelect,
}: {
  sizes: Size[];
  selectedSize: Size;
  nextSize: Size | null;
  handleSizeSelect: (size: Size) => void;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select size</h2>
      <div
        className={`grid grid-rows-1 gap-4`}
        style={{
          gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
        }}
      >
        {sizes.map((size: Size) => (
          <SizeOption key={size.name} size={size} selected={selectedSize === size} handleSelect={handleSizeSelect} />
        ))}
      </div>
      {nextSize && (
        <p className="text-xs md:text-sm text-gray-600 mt-4">
          <span>Upsell:&nbsp;</span>
          <span className="italic whitespace-normal">
            &quot;Would you like to make that a {nextSize.name} for only {nextSize.addonPrice - selectedSize.addonPrice}{" "}
            {CURRENCY_CODE} more?&quot;
          </span>
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
