import React from "react";
import { useGlobalContext } from "../../GlobalProvider/hooks";

export default function SearchBar() {
  const { setInGlobalContext, filterConfig } = useGlobalContext();

  function debounce(func: Function, delay: number) {
    let timer;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (typeof func === "function") {
          func.apply(this, args);
        }
      }, delay);
    };
  }

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;
      console.log("Search text:", searchText);
      setInGlobalContext({
        filterConfig: {
          searchText: searchText,
        },
      });
    },
    500
  );

  return (
    <div className="p-4 bg-gray-900">
      <input
        type="text"
        placeholder="Find the items you're looking for"
        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none"
        onChange={handleSearch}
      />
    </div>
  );
}
