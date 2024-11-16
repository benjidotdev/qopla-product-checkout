import React from "react";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../../constants";
import { AdditionalData, AddOn } from "../../../../../types/products";

interface QuantityButtonProps {
  group: AdditionalData;
  count: number;
  onRemove: () => void;
  onAdd: () => void;
  groupDisabled: boolean;
  addon: AddOn;
}

const QuantityButton = ({ group, count, onRemove, onAdd, groupDisabled, addon }: QuantityButtonProps) => {
  const {
    addon: { name, price },
  } = addon;

  return (
    <div
      className={clsx(
        "flex flex-1 items-center justify-between p-4 border rounded-lg transition-colors",
        count > 0 ? "bg-qopla-green border-qopla-gold text-qopla-gold" : "bg-gray-100 text-gray-600",
      )}
    >
      <div>
        <span className="font-bold">{name}</span>
        <span className="ml-4 text-xs">{price > 0 && `+ ${price} ${CURRENCY_CODE}`}</span>
      </div>
      <div className="flex items-center">
        <button
          className={clsx(
            "px-2 py-1 bg-gray-200 rounded-lg aspect-square w-8 h-8 disabled:opacity-50",
            count > 0 ? "bg-qopla-gold border-qopla-gold text-qopla-green" : "bg-gray-100 text-gray-600",
          )}
          onClick={onRemove}
          disabled={count === 0}
        >
          -
        </button>
        <div className="flex items-center justify-center text-sm mx-2 w-6">
          <p>{count}</p>
          <span>/{Math.min(addon.limit, group.limit)}</span>
        </div>
        <button
          className={clsx(
            "px-2 py-1 bg-gray-200 rounded-lg aspect-square w-8 h-8 disabled:opacity-50",
            count > 0 ? "bg-qopla-gold border-qopla-gold text-qopla-green" : "bg-gray-100 text-gray-600",
          )}
          onClick={onAdd}
          disabled={count >= Math.min(addon.limit, group.limit) || groupDisabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityButton;
