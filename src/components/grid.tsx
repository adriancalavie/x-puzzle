import { Tile } from "./tile";
import { GRID_SIZES } from "../concepts/grid";
import { useTiles } from "./hooks/tiles-hooks";
import { ActionBar } from "./action-bar";
import { Debug } from "./debug/debug";

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

      <Debug show />
      <ActionBar />
    </>
  );
};
