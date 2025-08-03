import { useReducer, type PropsWithChildren } from "react";
import { TilesContext, TilesDispatchContext } from "../contexts/tiles-context";
import { gridReducer, initialState } from "../reducers/grid-reducer";
import type { Rank } from "../../concepts/grid";

export interface TilesProviderProps extends PropsWithChildren {
  rank: Rank;
}

export const TilesProvider = ({ children, rank }: TilesProviderProps) => {
  const [state, dispatch] = useReducer(gridReducer, rank, initialState);
  return (
    <TilesContext.Provider value={state}>
      <TilesDispatchContext.Provider value={dispatch}>
        {children}
      </TilesDispatchContext.Provider>
    </TilesContext.Provider>
  );
};
