import { MAP_SIZES, type Rank } from "../concepts/grid";
import { EMPTY_TILE_VALUE, type TileValueArray } from "../concepts/tile";

export const randomTiles = (rows: Rank): TileValueArray => {
  const values: TileValueArray = [
    EMPTY_TILE_VALUE,
    ...Array.from({ length: MAP_SIZES[rows] - 1 }, (_, i) => i + 1),
  ];

  // randomly shuffle the values
  values.sort(() => Math.random() - 0.5);
  return values;
};
