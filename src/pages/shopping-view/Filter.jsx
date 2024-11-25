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
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(FilterOptions).map((keyItems) => (
          <Fragment key={keyItems}>
            <div>
              <h3 className="text-base font-extrabold">{keyItems}</h3>
              <div className="grid gap-2 mt-3">
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
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
