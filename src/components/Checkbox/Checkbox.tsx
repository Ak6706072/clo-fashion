import React from "react";

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
};

export default function Checkbox({
  label,
  checked,
  onChange,
  id,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer text-white"
    >
      <span className="relative inline-block w-4 h-4">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer absolute opacity-0 w-full h-full cursor-pointer"
        />

        <div className="w-4 h-4 bg-gray-800 border border-gray-400 rounded-sm peer-checked:bg-green-500" />

        <svg
          className="absolute left-0 top-0 w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>

      {label && <span>{label}</span>}
    </label>
  );
}
