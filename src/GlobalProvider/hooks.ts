import { useContext } from "react";
import { GlobalContext } from "./context";

export const useGlobalContext = () => {
  const { context, setInGlobalContext } = useContext(GlobalContext);
  return { ...context, setInGlobalContext };
};
