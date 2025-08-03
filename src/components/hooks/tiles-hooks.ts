import { useContext } from "react";
import { TilesContext, TilesDispatchContext } from "../contexts/tiles-context";

export function useTiles() {
  const context = useContext(TilesContext);
  if (context === null) {
    throw new Error("useTiles must be used within a TilesProvider");
  }
  return context;
}

export function useTilesDispatch() {
  const context = useContext(TilesDispatchContext);
  if (context === null) {
    throw new Error("useTilesDispatch must be used within a TilesProvider");
  }
  return context;
}
