import { createContext, type Dispatch } from "react";
import type { GridAction, GridState } from "../reducers/grid-reducer";

export const TilesContext = createContext<GridState | null>(null);
export const TilesDispatchContext = createContext<Dispatch<GridAction> | null>(
  null
);
