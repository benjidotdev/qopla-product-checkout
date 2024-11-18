import React from "react";
import { Flavour } from "../../../../../types/products";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../../constants";

const FlavourOption = ({
  flavour,
  selected,
  handleSelect,
}: {
  flavour: Flavour;
  selected: boolean;
  handleSelect: (flavour: Flavour) => void;
}) => {
  return (
    <button
      key={flavour.name}
      onClick={() => handleSelect(flavour)}
      className={clsx(
        "p-4 border rounded-lg transition-colors",
        selected ? "bg-qopla-green border-qopla-gold text-qopla-gold" : "bg-gray-100 hover:bg-gray-200 text-gray-600",
      )}
    >
      <p className="font-bold">{flavour.name}</p>
      {flavour.addonPrice !== 0 && (
        <p className={clsx("text-xs", selected ? "text-qopla-gold" : "text-gray-600")}>
          {flavour.addonPrice > 0 && "+"}
          {flavour.addonPrice} {CURRENCY_CODE}
        </p>
      )}
    </button>
  );
};

const FlavourSelector = ({
  flavours,
  selectedFlavour,
  handleFlavourSelect,
}: {
  flavours: Flavour[];
  selectedFlavour: Flavour;
  handleFlavourSelect: (flavour: Flavour) => void;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select flavour</h2>
      <div className="flex flex-col gap-4">
        {flavours.map((flavour: Flavour) => (
          <FlavourOption
            key={flavour.name}
            flavour={flavour}
            selected={selectedFlavour === flavour}
            handleSelect={handleFlavourSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default FlavourSelector;
