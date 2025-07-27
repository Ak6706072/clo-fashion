import React from "react";

import Header from "./components/Header/Header";

import SearchBar from "./components/SearchBar/Searchbar";
import FilterSection from "./components/FilterSection/FilterSection.jsx";
import ContentGrid from "./components/ContentGrid/ContentGrid.tsx";
import SortableDropdown from "./components/SortableDropdown/SortableDropdown.tsx";

function App() {
  return (
    <div className="bg-black">
      <Header />
      <SearchBar />
      <FilterSection />
      <div className="w-full flex justify-end">
        <SortableDropdown />
      </div>
      <ContentGrid />
    </div>
  );
}

export default App;
