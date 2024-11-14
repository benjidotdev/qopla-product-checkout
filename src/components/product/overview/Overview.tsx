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
    <div className="flex flex-col w-full">
      <div>
        {selectedSize.name} {selectedFlavour.name}
      </div>
      <div>
        {selectedAddOns.map((group, index) => {
          console.log(group);
          return (
            <div key={index}>
              {group.addons.map((addon, addonIndex) => (
                <div key={addonIndex}>
                  {addon.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div>{totalPrice}</div>
    </div>
  );
};

export default Overview;
