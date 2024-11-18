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

  const getExistingGroup = (group: AdditionalData) => selectedAddOns.find(g => g.groupTitle === group.name);

  const getExistingAddon = (group: AdditionalData, addon: AddOn) => {
    const existingGroup = getExistingGroup(group);
    return existingGroup ? existingGroup.addons.find(a => a.name === addon.addon.name) : null;
  };

  const addAddOnToGroup = (group: AdditionalData, addon: AddOn) => {
    const existingGroup = getExistingGroup(group);
    if (existingGroup) {
      const newAddons = [...existingGroup.addons, addon.addon];
      const newGroups = selectedAddOns.map(g => {
        if (g.groupTitle === group.name) {
          return { ...g, addons: newAddons };
        }
        return g;
      });
      setSelectedAddOns(newGroups);
    } else {
      const newGroup = { groupTitle: group.name, addons: [addon.addon] };
      setSelectedAddOns([...selectedAddOns, newGroup]);
    }
  };

  const getSelectedAddonsInGroup = (group: AdditionalData) => {
    const existingGroup = getExistingGroup(group);
    return existingGroup ? existingGroup.addons.length : 0;
  };

  const removeAddonFromGroup = (group: AdditionalData, addon: AddOn) => {
    const existingGroup = getExistingGroup(group);
    if (existingGroup) {
      const addonIndex = existingGroup.addons.findIndex(a => a.name === addon.addon.name);
      if (addonIndex !== -1) {
        existingGroup.addons.splice(addonIndex, 1);
        const newGroups = selectedAddOns.map(g => {
          if (g.groupTitle === group.name) {
            return { ...g, addons: existingGroup.addons };
          }
          return g;
        });
        setSelectedAddOns(newGroups);
      }
    }
  };

  // Adds an addon to specific group
  const handleAddAddon = (group: AdditionalData, addon: AddOn) => {
    if (getSelectedAddonsInGroup(group) < group.limit && getAddonCount(group, addon) < addon.limit) {
      addAddOnToGroup(group, addon);
    }
  };

  // Toggles an addon if it or it's group has a limit of 1
  const handleToggleAddon = (group: AdditionalData, addon: AddOn) => {
    const existingAddon = getExistingAddon(group, addon);
    if (existingAddon) {
      removeAddonFromGroup(group, addon);
    } else {
      if (getSelectedAddonsInGroup(group) < group.limit && getAddonCount(group, addon) < addon.limit) {
        addAddOnToGroup(group, addon);
      }
    }
  };

  // Removes an addon from a specific group
  const handleRemoveAddon = (group: AdditionalData, addon: AddOn) => {
    removeAddonFromGroup(group, addon);
  };

  return (
    <div className="space-y-6 whitespace-nowrap">
      {sortedAdditionalData.map(group => {
        const allAddonsHaveLimitOne = group.addons.every(a => a.limit <= 1);
        const groupDisabled = getSelectedAddonsInGroup(group) >= group.limit;

        return (
          <div key={group.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <div className="flex items-center text-sm text-gray-600">
                Selected{" "}
                <div className="w-7 flex justify-center">
                  {getSelectedAddonsInGroup(group)}/{group.limit}
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
                          isSelected={!!getExistingAddon(group, addon)}
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
