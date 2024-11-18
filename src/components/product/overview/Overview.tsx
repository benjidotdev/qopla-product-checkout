import React from "react";
import { AddOnDetails, Flavour, SelectedAddOnGroup, Size, AdditionalData } from "../../../types/products";
import { CURRENCY_CODE } from "../../../constants";

interface OverviewProps {
  selectedSize: Size;
  selectedFlavour: Flavour;
  selectedAddOns: SelectedAddOnGroup[];
  totalPrice: number;
  additionalData: AdditionalData[];
}

const Overview = ({ selectedSize, selectedFlavour, selectedAddOns, totalPrice, additionalData }: OverviewProps) => {
  const getFormattedAddonName = (group: SelectedAddOnGroup, addon: AddOnDetails) => {
    if (group.groupTitle === "To remove") {
      return `- ${addon.name}`;
    } else if (group.groupTitle === "Extra toppings") {
      return `+ ${addon.name}`;
    }
    return addon.name;
  };

  const sortedSelectedAddOns = additionalData?.length > 0 ? [...selectedAddOns].sort((a, b) => {
    const groupA = additionalData?.find(group => group.name === a.groupTitle);
    const groupB = additionalData?.find(group => group.name === b.groupTitle);
    if (!groupA || !groupB) {
      return 0;
    }
    return groupA.sortOrder - groupB.sortOrder;
  }) : selectedAddOns;

  const renderAddOns = (group: SelectedAddOnGroup, index: number) => {
    if (group.addons.length === 0) return null;

    return (
      <li key={index} className="flex flex-col mb-2">
        <span className="text-sm font-light">{group.groupTitle}:</span>
        <ul>
          {group.addons.map((addon, addonIndex) => (
            <li key={addonIndex} className="text-lg font-bold">
              {getFormattedAddonName(group, addon)}
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <div className="flex flex-col h-full w-full px-6 border-l border-gray-200">
      <div className="flex flex-col mb-2">
        <span className="text-sm font-light">Size:</span>
        <span className="text-lg font-bold">{selectedSize.name}</span>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-sm font-light">Flavour:</span>
        <span className="text-lg font-bold">{selectedFlavour.name}</span>
      </div>
      <div className="mb-6 flex-1">
        <ul>
          {sortedSelectedAddOns.map(renderAddOns)}
        </ul>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-sm font-light">Total Price:</span>
        <span className="text-lg font-bold">
          {totalPrice.toFixed(2)} {CURRENCY_CODE}
        </span>
      </div>
    </div>
  );
};

export default Overview;