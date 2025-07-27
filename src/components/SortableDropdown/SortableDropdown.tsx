import React, { useState } from "react";
import { useGlobalContext } from "../../GlobalProvider/hooks";

const options = [
  { value: "title", label: "Item Name" },
  { value: "higherPrice", label: "Price: High to Low" },
  { value: "lowPrice", label: "Price: Low to High" },
];

export default function SortableDropdown() {
  const { filterConfig, setInGlobalContext } = useGlobalContext();

  const handleChange = (e) => {
    const value = e.target.value;
    setInGlobalContext({ filterConfig: { sortBy: value } });
  };

  return (
    <div className="w-full flex justify-end bg-gray-900">
      <div className="w-[350px] px-4 py-4 text-white flex items-center gap-[10px]">
        <label className="block mb-2 font-semibold w-[90px]">Sort By</label>
        <select
          value={filterConfig.sortBy || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
