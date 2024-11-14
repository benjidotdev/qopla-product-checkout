import React from "react";
import { AdditionalData, SelectedAddOnGroup } from "../../../../types/products";

interface AddOnProps {
  additionalData: AdditionalData[];
  selectedAddOns: SelectedAddOnGroup[];
  setSelectedAddOns: (addons: SelectedAddOnGroup[]) => void;
}

const AddOnStep = ({ additionalData, selectedAddOns, setSelectedAddOns }: AddOnProps) => {
  const sortedAdditionalData = [...additionalData].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      {sortedAdditionalData.map((group, index) => {
        const groupKey = `group-${group.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
        console.log(groupKey);
        return (
          <div key={groupKey} className="space-y-4">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-sm text-gray-600">
              Select up to {group.limit} {group.limit === 1 ? "item" : "items"}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {group.addons
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((addon, index) => {
                  const addonKey = `addon-${group.name.toLowerCase().replace(/\s+/g, "-")}-${addon.addon.name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
                  console.log(addonKey);
                  const count = selectedAddOns.reduce((acc, selectedGroup) => {
                    if (selectedGroup.groupTitle === group.name) {
                      return (
                        acc +
                        selectedGroup.addons.filter(selectedAddon => selectedAddon.name === addon.addon.name).length
                      );
                    }
                    return acc;
                  }, 0);

                  const allAddonsHaveLimitOne = group.addons.every(a => a.limit === 1);

                  const handleAdd = () => {
                    const totalSelectedAddonsInGroup = selectedAddOns.reduce((acc, selectedGroup) => {
                      if (selectedGroup.groupTitle === group.name) {
                        return acc + selectedGroup.addons.length;
                      }
                      return acc;
                    }, 0);
                    if (count < addon.limit && totalSelectedAddonsInGroup < group.limit) {
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

                  const handleToggle = () => {
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

                  const handleRemove = () => {
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
                    <div key={addonKey} className="flex flex-col items-center">
                      <p className="font-medium">{addon.addon.name}</p>
                      {addon.addon.price !== 0 && (
                        <p className="text-sm text-gray-600">
                          {addon.addon.price > 0 && "+"}
                          {addon.addon.price} SEK
                        </p>
                      )}
                      {allAddonsHaveLimitOne || group.limit === 1 ? (
                        <button
                          className={`p-4 border rounded-lg transition-colors ${
                            selectedAddOns.some(selectedGroup =>
                              selectedGroup.groupTitle === group.name && selectedGroup.addons.some(selectedAddon => selectedAddon.name === addon.addon.name)
                            )
                              ? "bg-qopla-gold border-qopla-green"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={handleToggle}
                        >
                          {selectedAddOns.some(selectedGroup =>
                            selectedGroup.groupTitle === group.name && selectedGroup.addons.some(selectedAddon => selectedAddon.name === addon.addon.name)
                          )
                            ? "Selected"
                            : "Select"}
                        </button>
                      ) : (
                        <div className="flex items-center">
                          <button className="px-2 py-1 bg-gray-200 rounded-lg" onClick={handleRemove}>
                            -
                          </button>
                          <p className="mx-2">{count}</p>
                          <span className="text-sm text-gray-600">/{addon.limit}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded-lg"
                            onClick={handleAdd}
                            disabled={count >= addon.limit || count >= group.limit}
                          >
                            +
                          </button>
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
