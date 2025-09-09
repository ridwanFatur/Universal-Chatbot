import { useContext, useState, type ReactNode } from "react";
import React from "react";

function useGlobalController() {
	const [simpleState, setSimpleState] = useState("")
	return {
		simpleState,
		setSimpleState
	}
}

type GlobalController = ReturnType<typeof useGlobalController>;

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <GlobalContext.Provider value={useGlobalController()}>
      {children}
    </GlobalContext.Provider>
  );
}

export const GlobalContext: React.Context<GlobalController> =
  React.createContext({} as GlobalController);

export function useGlobal() {
  return useContext(GlobalContext);
}