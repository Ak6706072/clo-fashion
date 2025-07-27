import { FilterConfig } from "../constants/types";

export const parseFilterConfigFromURL = (): FilterConfig => {
  const params = new URLSearchParams(window.location.search);
  return {
    0: params.get("0") === "true",
    1: params.get("1") === "true",
    2: params.get("2") === "true",
    priceRange: parseInt(params.get("priceRange") || "999", 10),
    searchText: params.get("searchText") || "",
    sortBy: params.get("sortBy") || "title",
  };
};
