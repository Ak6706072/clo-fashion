import { createContext } from "react";
import { ContentItem, FilterConfig } from "../constants/types";
import { parseFilterConfigFromURL } from "./utils";

interface GlobalContextType {
  context: {
    contentData: ContentItem[] | null;
    filterConfig: FilterConfig;
  };
  setInGlobalContext: React.Dispatch<React.SetStateAction<any>>;
}

export const DEFAULT_VALUE = {
  contentData: null,
  filterConfig: {
    0: undefined,
    1: undefined,
    2: undefined,
    priceRange: 999,
    sortBy: "title",
    searchText: "",
  },
};

export const GlobalContext = createContext<GlobalContextType>({
  context: {
    ...DEFAULT_VALUE,
    filterConfig: parseFilterConfigFromURL(),
  },
  setInGlobalContext: (data: Record<string, any>) => {},
});
