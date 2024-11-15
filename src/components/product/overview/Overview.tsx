import React from "react";
import { Flavour, SelectedAddOnGroup, Size } from "../../../types/products";

interface OverviewProps {
  selectedSize: Size;
  selectedFlavour: Flavour;
  selectedAddOns: SelectedAddOnGroup[];
  totalPrice: number;
}

const Overview = ({ selectedSize, selectedFlavour, selectedAddOns, totalPrice }: OverviewProps) => {
  return (
    <div className="flex flex-col w-full h-full px-6 bg-white border-l border-gray-200">
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
          {selectedAddOns.map((group, index) => (
            <React.Fragment key={index}>
              {group.addons.length > 0 && (
                <li className="flex flex-col mb-2">
                  <span className="text-sm font-light">{group.groupTitle}:</span>
                  <ul>
                    {group.addons.map((addon, addonIndex) => (
                      <li className="text-lg font-bold" key={addonIndex}>
                        {group.groupTitle === "To remove"
                          ? `- ${addon.name}`
                          : group.groupTitle === "Extra toppings"
                            ? `+ ${addon.name}`
                            : addon.name}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mb-2">
        <span className="text-sm font-light">Total Price:</span>
        <span className="text-lg font-bold">{totalPrice.toFixed(2)} SEK</span>
      </div>
    </div>
  );
};

export default Overview;
