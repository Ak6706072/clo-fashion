import { useState } from "react";
import React from "react";
import { DEFAULT_VALUE, GlobalContext } from "./context";
import { ContentItem, FilterConfig } from "../constants/types";
import { parseFilterConfigFromURL } from "./utils";

type GlobalContextState = {
  contentData: ContentItem[] | null;
  filterConfig: FilterConfig;
};

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [context, setContext] = useState<GlobalContextState>({
    ...DEFAULT_VALUE,
    filterConfig: parseFilterConfigFromURL(),
  });

  const setInGlobalContext = (data: Partial<GlobalContextState>) => {
    setContext((prev) => {
      const newFilterConfig = {
        ...prev.filterConfig,
        ...(data?.filterConfig || {}),
      };

      // 🔄 Update URL without reloading page
      const params = new URLSearchParams();
      Object.entries(newFilterConfig).forEach(([key, val]) => {
        params.set(key, String(val));
      });

      const newURL = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newURL);

      return {
        ...prev,
        ...data,
        filterConfig: newFilterConfig,
      };
    });
  };

  return (
    <GlobalContext.Provider value={{ context, setInGlobalContext }}>
      {children}
    </GlobalContext.Provider>
  );
};
