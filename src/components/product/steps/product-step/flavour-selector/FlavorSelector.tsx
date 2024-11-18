import React from "react";
import { Flavour } from "../../../../../types/products";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../../constants";

const FlavorOption = ({
  flavor,
  selected,
  handleSelect,
}: {
  flavor: Flavour;
  selected: boolean;
  handleSelect: (flavor: Flavour) => void;
}) => {
  return (
    <button
      key={flavor.name}
      onClick={() => handleSelect(flavor)}
      className={clsx(
        "p-4 border rounded-lg transition-colors",
        selected ? "bg-qopla-green border-qopla-gold text-qopla-gold" : "bg-gray-100 hover:bg-gray-200 text-gray-600",
      )}
    >
      <p className="font-bold">{flavor.name}</p>
      {flavor.addonPrice !== 0 && (
        <p className={clsx("text-xs", selected ? "text-qopla-gold" : "text-gray-600")}>
          {flavor.addonPrice > 0 && "+"}
          {flavor.addonPrice} {CURRENCY_CODE}
        </p>
      )}
    </button>
  );
};

const FlavorSelector = ({
  flavors,
  selectedFlavor,
  handleFlavorSelect,
}: {
  flavors: Flavour[];
  selectedFlavor: Flavour;
  handleFlavorSelect: (flavor: Flavour) => void;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select flavor</h2>
      <div className="flex flex-col gap-4">
        {flavors.map((flavor: Flavour) => (
          <FlavorOption
            key={flavor.name}
            flavor={flavor}
            selected={selectedFlavor === flavor}
            handleSelect={handleFlavorSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FlavorSelector;
