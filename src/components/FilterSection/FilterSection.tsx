import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import PricingSlider from "./PricingSlider";
import { useGlobalContext } from "../../GlobalProvider/hooks";
import { FILTER_OPTIONS } from "../../constants/constants";
import { PricingOptionEnum } from "../../constants/enums";

type FilterSectionProps = {
  valueConfig: Record<string, string | boolean>;
};

export default function FilterSection() {
  const { filterConfig, setInGlobalContext } = useGlobalContext();

  const onReset = () => {
    setInGlobalContext({
      filterConfig: {
        [PricingOptionEnum.PAID]: false,
        [PricingOptionEnum.FREE]: false,
        [PricingOptionEnum.VIEW_ONLY]: false,
        priceRange: 999, // Default price range
        sortBy: "",
        searchText: "",
      },
    });
  };

  return (
    <div className="px-4 py-3 bg-gray-900">
      <h2 className="text-green-400 font-semibold mb-2">Contents Filter</h2>

      <div className="bg-black p-[14px] flex justify-between gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-gray-600 min-w-[100px]">Pricing Option</span>

          {FILTER_OPTIONS.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              onChange={() => {
                setInGlobalContext({
                  filterConfig: {
                    ...filterConfig,
                    [option.value]: !filterConfig?.[option.value],
                  },
                });
              }}
              checked={filterConfig[option?.value] === true}
              id={`filter-${option.value}`}
            />
          ))}

          <div className="w-full sm:w-auto">
            <PricingSlider
              onChange={(value) => {
                setInGlobalContext({
                  filterConfig: {
                    ...filterConfig,
                    priceRange: value,
                  },
                });
              }}
            />
          </div>
        </div>

        <div>
          <button className="text-sm text-gray-400 underline" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
