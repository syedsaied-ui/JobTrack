import { useContext } from "react";
import ApplicationContext from "./ApplicationContext";

const useApplications = () => {
  const contextValue = useContext(ApplicationContext);
  if (contextValue === undefined) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider",
    );
  }
  return contextValue;
};
export default useApplications;
