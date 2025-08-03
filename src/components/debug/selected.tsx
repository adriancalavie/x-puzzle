import { getByPosition } from "../../concepts/grid";
import { useTiles } from "../hooks/tiles-hooks";

export const Selected = () => {
  const state = useTiles();

  return (
    <div className="flex flex-col mt-4 text-sm text-gray-300">
      <div>
        Selected #1:{" "}
        {state.selected.first
          ? `${state.selected.first.row}×${state.selected.first.col} → ${
              getByPosition(state.tiles, state.selected.first, state.rank).value
            }`
          : "None"}
      </div>
      <div>
        Selected #2:{" "}
        {state.selected.second
          ? `${state.selected.second.row}×${state.selected.second.col} → ${
              getByPosition(state.tiles, state.selected.second, state.rank)
                .value
            }`
          : "None"}
      </div>
    </div>
  );
};
