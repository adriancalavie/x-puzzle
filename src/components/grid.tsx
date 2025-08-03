import { Tile } from "./tile";
import { GRID_SIZES } from "../concepts/grid";
import { useTiles } from "./hooks/tiles-hooks";
import { ActionBar } from "./action-bar";

export const Grid = () => {
  const state = useTiles();
  const gridSize = GRID_SIZES[state.rank];

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="relative mx-auto mt-[10%]"
          style={{ width: `${gridSize}px`, height: `${gridSize}px` }}
        >
          {state.tiles.map((tile) => (
            <Tile
              key={`tile-${tile.id}`}
              value={tile.value}
              position={tile.position}
              selected={tile.selected}
              animated={true}
            />
          ))}
        </div>
      </div>

      {/* <div className="flex flex-col mt-4 text-sm text-gray-300">
        <div>
          Selected #1:{" "}
          {state.selected.first
            ? `${state.selected.first.row}×${state.selected.first.col} → ${
                getByPosition(state.tiles, state.selected.first, state.rank)
                  .value
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
      </div> */}
      <ActionBar />
    </>
  );
};
