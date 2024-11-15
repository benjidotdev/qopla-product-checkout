import React from "react";
import { AdditionalData, SelectedAddOnGroup } from "../../../../types/products";
import clsx from "clsx";
import { CURRENCY_CODE } from "../../../../constants";

interface AddOnProps {
  additionalData: AdditionalData[];
  selectedAddOns: SelectedAddOnGroup[];
  setSelectedAddOns: (addons: SelectedAddOnGroup[]) => void;
}

const AddOnStep = ({ additionalData, selectedAddOns, setSelectedAddOns }: AddOnProps) => {
  const sortedAdditionalData = [...additionalData].sort((a, b) => a.sortOrder - b.sortOrder);

  const getGroupKey = (group: AdditionalData, index: number) => {
    return `group-${group.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
  };

  const getAddonKey = (group: AdditionalData, addon: any, index: number) => {
    return `addon-${group.name.toLowerCase().replace(/\s+/g, "-")}-${addon.addon.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
  };

  const getAddonCount = (group: AdditionalData, addon: any) => {
    return selectedAddOns.reduce((acc, selectedGroup) => {
      if (selectedGroup.groupTitle === group.name) {
        return acc + selectedGroup.addons.filter(selectedAddon => selectedAddon.name === addon.addon.name).length;
      }
      return acc;
    }, 0);
  };

  const handleAddAddon = (group: AdditionalData, addon: any) => {
    const totalSelectedAddonsInGroup = selectedAddOns.reduce((acc, selectedGroup) => {
      if (selectedGroup.groupTitle === group.name) {
        return acc + selectedGroup.addons.length;
      }
      return acc;
    }, 0);
    if (getAddonCount(group, addon) < addon.limit && totalSelectedAddonsInGroup < group.limit) {
      const existingGroup = selectedAddOns.find(g => g.groupTitle === group.name);
      if (existingGroup) {
        if (existingGroup.addons.length < group.limit) {
          const newAddons = [...existingGroup.addons, addon.addon];
          const newGroups = selectedAddOns.map(g => {
            if (g.groupTitle === group.name) {
              return { ...g, addons: newAddons };
            }
            return g;
          });
          setSelectedAddOns(newGroups);
        }
      } else {
        if (selectedAddOns.filter(g => g.groupTitle === group.name).length < group.limit) {
          const newGroup = { groupTitle: group.name, addons: [addon.addon] };
          setSelectedAddOns([...selectedAddOns, newGroup]);
        }
      }
    }
  };

  const handleToggleAddon = (group: AdditionalData, addon: any) => {
    const existingGroup = selectedAddOns.find(g => g.groupTitle === group.name);
    if (existingGroup) {
      const existingAddon = existingGroup.addons.find(a => a.name === addon.addon.name);
      if (existingAddon) {
        const newAddons = existingGroup.addons.filter(a => a.name !== addon.addon.name);
        const newGroups = selectedAddOns.map(g => {
          if (g.groupTitle === group.name) {
            return { ...g, addons: newAddons };
          }
          return g;
        });
        setSelectedAddOns(newGroups);
      } else {
        const totalSelectedAddonsInGroup = selectedAddOns.reduce((acc, selectedGroup) => {
          if (selectedGroup.groupTitle === group.name) {
            return acc + selectedGroup.addons.length;
          }
          return acc;
        }, 0);
        if (totalSelectedAddonsInGroup < group.limit) {
          const newAddons = [...existingGroup.addons, addon.addon];
          const newGroups = selectedAddOns.map(g => {
            if (g.groupTitle === group.name) {
              return { ...g, addons: newAddons };
            }
            return g;
          });
          setSelectedAddOns(newGroups);
        }
      }
    } else {
      const totalSelectedAddonsInGroup = selectedAddOns.reduce((acc, selectedGroup) => {
        if (selectedGroup.groupTitle === group.name) {
          return acc + selectedGroup.addons.length;
        }
        return acc;
      }, 0);
      if (totalSelectedAddonsInGroup < group.limit) {
        const newGroup = { groupTitle: group.name, addons: [addon.addon] };
        setSelectedAddOns([...selectedAddOns, newGroup]);
      }
    }
  };

  const handleRemoveAddon = (group: AdditionalData, addon: any) => {
    const count = getAddonCount(group, addon);
    if (count > 0) {
      const existingGroup = selectedAddOns.find(g => g.groupTitle === group.name);
      if (existingGroup) {
        const index = existingGroup.addons.findIndex(a => a.name === addon.addon.name);
        if (index !== -1) {
          const newAddons = [...existingGroup.addons];
          newAddons.splice(index, 1);
          const newGroups = selectedAddOns.map(g => {
            if (g.groupTitle === group.name) {
              return { ...g, addons: newAddons };
            }
            return g;
          });
          setSelectedAddOns(newGroups);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {sortedAdditionalData.map((group, index) => {
        const allAddonsHaveLimitOne = group.addons.every(a => a.limit === 1);

        return (
          <div key={getGroupKey(group, index)} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <p className="text-sm text-gray-600">
                Selected {selectedAddOns.find(g => g.groupTitle === group.name)?.addons.length || 0}/{group.limit} items
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {group.addons
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((addon, index) => {
                  const count = getAddonCount(group, addon);

                  return (
                    <div key={getAddonKey(group, addon, index)} className="flex items-center">
                      {allAddonsHaveLimitOne || group.limit === 1 ? (
                        <button
                          className={clsx(
                            "flex flex-1 items-center justify-between p-4 border rounded-lg transition-colors",
                            selectedAddOns.some(
                              selectedGroup =>
                                selectedGroup.groupTitle === group.name &&
                                selectedGroup.addons.some(selectedAddon => selectedAddon.name === addon.addon.name),
                            )
                              ? "bg-qopla-green border-qopla-gold text-qopla-gold"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-600",
                          )}
                          onClick={() => handleToggleAddon(group, addon)}
                        >
                          <span className="font-bold">{addon.addon.name}</span>
                          {addon.addon.price !== 0 && (
                            <span
                              className={clsx(
                                "text-xs text-gray-600",
                                selectedAddOns.some(
                                  selectedGroup =>
                                    selectedGroup.groupTitle === group.name &&
                                    selectedGroup.addons.some(selectedAddon => selectedAddon.name === addon.addon.name),
                                )
                                  ? "border-qopla-gold text-qopla-gold"
                                  : "hover:bg-gray-200 text-gray-600",
                              )}
                            >
                              {addon.addon.price > 0 && "+"}
                              {addon.addon.price} {CURRENCY_CODE}
                            </span>
                          )}
                        </button>
                      ) : (
                        <div
                          className={clsx(
                            "flex flex-1 items-center justify-between p-4 border rounded-lg transition-colors",
                            count > 0 ? "bg-qopla-green border-qopla-gold text-qopla-gold" : "bg-gray-100 text-gray-600",
                          )}
                        >
                          <div>
                            <span className="font-bold">{addon.addon.name}</span>
                            <span className="ml-4 text-xs">{addon.addon.price > 0 && `+ ${addon.addon.price} ${CURRENCY_CODE}`}</span>
                          </div>
                          <div className="flex items-center">
                          <button
                              className={clsx(
                                "px-2 py-1 bg-gray-200 rounded-lg aspect-square w-8 h-8",
                                count > 0 ? "bg-qopla-gold border-qopla-gold text-qopla-green" : "bg-gray-100 text-gray-600",
                              )}
                              onClick={() => handleRemoveAddon(group, addon)}
                            >
                              -
                            </button>
                            <div className="flex items-center justify-center text-sm mx-2 w-6">
                              <p>{count}</p>
                              <span>/{addon.limit}</span>
                            </div>
                            <button
                              className={clsx(
                                "px-2 py-1 bg-gray-200 rounded-lg aspect-square w-8 h-8",
                                count > 0 ? "bg-qopla-gold border-qopla-gold text-qopla-green" : "bg-gray-100 text-gray-600",
                              )}
                              onClick={() => handleAddAddon(group, addon)}
                              disabled={count >= addon.limit || count >= group.limit}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddOnStep;
