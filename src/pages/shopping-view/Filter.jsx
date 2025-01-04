import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FilterOptions } from "@/config";
import React, { Fragment, useState } from "react";

const ProductFilter = ({ filter, handleFilters }) => {
  // Track selected filters
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (category, optionId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] ? [...prev[category], optionId] : [optionId],
    }));
  };

  return (
    <div className="bg-background sm:h-min rounded-lg shadow-sm border border-gray-300">
  <div className="p-4 border-b flex items-center justify-between">
    <h2 className="text-lg font-semibold font-cairoPlay">Filters</h2>
  </div>
  <div className="p-4 space-y-4 font-cairoPlay">
    {Object.keys(FilterOptions).map((keyItems) => (
      <div key={keyItems} className="border-b">
        <details className="group">
          <summary className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
            <h3 className="text-base font-extrabold">{keyItems}</h3>
            <span className="transform transition-transform group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div
            className="grid gap-2 mt-3 grid-cols-1 p-2"
          >
            {FilterOptions[keyItems].map((options) => (
              <label
                key={options.id}
                className="flex items-center gap-2 font-medium"
              >
                <Checkbox
                  checked={
                    filter &&
                    Object.keys(filter).length > 0 &&
                    filter[keyItems] &&
                    filter[keyItems].indexOf(options.id) > -1
                  }
                  onCheckedChange={() =>
                    handleFilters(keyItems, options.id)
                  }
                />
                {options.label}
              </label>
            ))}
          </div>
        </details>
      </div>
    ))}
  </div>
</div>

  );
};

export default ProductFilter;
