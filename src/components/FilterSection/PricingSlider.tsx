import React, { useState } from "react";
import { useGlobalContext } from "../../GlobalProvider/hooks";

type PricingSliderProps = {
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function PricingSlider({
  min = 0,
  max = 999,
  onChange,
}: PricingSliderProps) {
  const { filterConfig } = useGlobalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className="w-[300px] text-white">
      <div className="flex justify-between gap-[8px] text-sm mb-1 text-gray-300">
        <span>${min}</span>
        <input
          disabled={!filterConfig[0]}
          type="range"
          min={min}
          max={max}
          value={!filterConfig[0] ? max : filterConfig?.priceRange}
          onChange={handleChange}
          className="w-full accent-green-500"
        />
        <span>${!filterConfig[0] ? max : filterConfig?.priceRange}+</span>
      </div>
    </div>
  );
}
