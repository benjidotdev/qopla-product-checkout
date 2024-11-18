import React from "react";
import { Flavour, SelectedAddOnGroup, Size, AdditionalData } from "../../../types/products";
import { CURRENCY_CODE } from "../../../constants";
import clsx from "clsx";

interface OverviewProps {
  selectedSize: Size;
  selectedFlavour: Flavour;
  selectedAddOns: SelectedAddOnGroup[];
  totalPrice: number;
  additionalData: AdditionalData[];
  finalStep: boolean;
}

const Overview = ({ selectedSize, selectedFlavour, selectedAddOns, totalPrice, additionalData, finalStep }: OverviewProps) => {
  const getFormattedAddonPrefix = (group: SelectedAddOnGroup) => {
    if (group.groupTitle === "To remove") {
      return `-`;
    } else if (group.groupTitle === "Extra toppings") {
      return `+`;
    }
    return "";
  };

  const sortedSelectedAddOns =
    additionalData?.length > 0
      ? [...selectedAddOns].sort((a, b) => {
          const groupA = additionalData?.find(group => group.name === a.groupTitle);
          const groupB = additionalData?.find(group => group.name === b.groupTitle);
          if (!groupA || !groupB) {
            return 0;
          }
          return groupA.sortOrder - groupB.sortOrder;
        })
      : selectedAddOns;

  const renderAddOns = (group: SelectedAddOnGroup, index: number) => {
    if (group.addons.length === 0) return null;

    const addonCounts: { name: string; count: number }[] = [];

    group.addons.forEach(addon => {
      const existingAddon = addonCounts.find((a: { name: string; count: number }) => a.name === addon.name);
      if (existingAddon) {
        existingAddon.count++;
      } else {
        addonCounts.push({ name: addon.name, count: 1 });
      }
    });

    return (
      <li key={index} className={clsx("flex flex-col mb-2")}>
        <span className="text-xs md:text-sm font-light">{group.groupTitle}:</span>
        <ul>
          {addonCounts.map((addon: { name: string; count: number }, addonIndex) => (
            <li key={addonIndex} className="text-sm md:text-lg font-bold">
              {getFormattedAddonPrefix(group)}
              {addon.count > 1 ? ` x${addon.count}` : ""} {addon.name}
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <div className="flex flex-col md:h-full w-full px-6 border-l border-gray-200 mt-2 md:mt-0">
      <div className={clsx(!finalStep ? "hidden md:flex" : "flex", "flex-col mb-2")}>
        <span className="text-xs md:text-sm font-light">Size:</span>
        <span className="text-sm md:text-lg font-bold">{selectedSize.name}</span>
      </div>
      <div className={clsx(!finalStep ? "hidden md:flex" : "flex", "flex-col mb-2")}>
        <span className="text-xs md:text-sm font-light">Flavour:</span>
        <span className="text-sm md:text-lg font-bold">{selectedFlavour.name}</span>
      </div>
      <div className={clsx(!finalStep ? "hidden md:flex" : "flex md:flex-1 mb-6")}>
        <ul>{sortedSelectedAddOns.map(renderAddOns)}</ul>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-xs md:text-sm font-light">Total Price:</span>
        <span className="text-sm md:text-lg font-bold">
          {totalPrice.toFixed(2)} {CURRENCY_CODE}
        </span>
      </div>
    </div>
  );
};

export default Overview;
