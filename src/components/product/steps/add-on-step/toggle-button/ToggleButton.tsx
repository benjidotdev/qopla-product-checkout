import React from "react";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../../constants";
import { AddOn } from "../../../../../types/products";

interface ToggleButtonProps {
  isSelected: boolean;
  onClick: () => void;
  addon: AddOn;
  groupDisabled: boolean;
}

const ToggleButton = ({ isSelected, onClick, addon, groupDisabled }: ToggleButtonProps) => {
  const {
    addon: { name, price },
  } = addon;
  return (
    <button
      className={clsx(
        "flex flex-1 items-center justify-between p-4 border rounded-lg transition-colors disabled:opacity-50",
        isSelected
          ? "bg-qopla-green border-qopla-gold text-qopla-gold"
          : "bg-gray-100 hover:bg-gray-200 disabled:hover:bg-gray-100 text-gray-600",
      )}
      onClick={onClick}
      disabled={(groupDisabled && !isSelected) || addon.limit === 0}
    >
      <span className="font-bold">{name}</span>
      {price !== 0 && (
        <span className={clsx("text-xs", isSelected ? "border-qopla-gold text-qopla-gold" : "text-gray-600")}>
          {price > 0 && "+"}
          {price} {CURRENCY_CODE}
        </span>
      )}
    </button>
  );
};

export default ToggleButton;
