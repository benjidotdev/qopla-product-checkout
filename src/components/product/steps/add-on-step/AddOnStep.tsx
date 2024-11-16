import React from "react";
import { AdditionalData, AddOn, SelectedAddOnGroup } from "../../../../types/products";
import ToggleButton from "./toggle-button/ToggleButton";
import QuantityButton from "./quantity-button/QuantityButton";

interface AddOnProps {
  additionalData: AdditionalData[];
  selectedAddOns: SelectedAddOnGroup[];
  setSelectedAddOns: (addons: SelectedAddOnGroup[]) => void;
}

const AddOnStep = ({ additionalData, selectedAddOns, setSelectedAddOns }: AddOnProps) => {
  const sortedAdditionalData = [...additionalData].sort((a, b) => a.sortOrder - b.sortOrder);

  // Calculates how many times a specific addon has been selected
  const getAddonCount = (group: AdditionalData, addon: AddOn) => {
    return selectedAddOns.reduce((acc, selectedGroup) => {
      if (selectedGroup.groupTitle === group.name) {
        return acc + selectedGroup.addons.filter(selectedAddon => selectedAddon.name === addon.addon.name).length;
      }
      return acc;
    }, 0);
  };

  // Adds an addon to specific group
  const handleAddAddon = (group: AdditionalData, addon: AddOn) => {
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

  // Toggles an addon if it or it's group had a limit of 1
  const handleToggleAddon = (group: AdditionalData, addon: AddOn) => {
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

  // Removes an addon from a specific group
  const handleRemoveAddon = (group: AdditionalData, addon: AddOn) => {
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
    <div className="space-y-6 whitespace-nowrap">
      {sortedAdditionalData.map(group => {
        const allAddonsHaveLimitOne = group.addons.every(a => a.limit <= 1);
        const totalSelectedAddonsInGroup = selectedAddOns.reduce((acc, selectedGroup) => {
          if (selectedGroup.groupTitle === group.name) {
            return acc + selectedGroup.addons.length;
          }
          return acc;
        }, 0);
        const groupDisabled = totalSelectedAddonsInGroup >= group.limit;

        return (
          <div key={group.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <div className="flex items-center text-sm text-gray-600">
                Selected{" "}
                <div className="w-7 flex justify-center">
                  {selectedAddOns.find(g => g.groupTitle === group.name)?.addons.length || 0}/{group.limit}
                </div>{" "}
                items
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {group.addons
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(addon => {
                  const count = getAddonCount(group, addon);

                  return (
                    <div key={addon.addon.name} className="flex items-center">
                      {allAddonsHaveLimitOne || group.limit === 1 ? (
                        <ToggleButton
                          addon={addon}
                          isSelected={selectedAddOns.some(
                            selectedGroup =>
                              selectedGroup.groupTitle === group.name &&
                              selectedGroup.addons.some(selectedAddon => selectedAddon.name === addon.addon.name),
                          )}
                          onClick={() => handleToggleAddon(group, addon)}
                          groupDisabled={groupDisabled}
                        />
                      ) : (
                        <QuantityButton
                          addon={addon}
                          onAdd={() => handleAddAddon(group, addon)}
                          onRemove={() => handleRemoveAddon(group, addon)}
                          group={group}
                          groupDisabled={groupDisabled}
                          count={count}
                        />
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
