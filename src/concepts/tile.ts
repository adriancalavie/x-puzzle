import { type Position, type Rank } from "./grid";

export const EMPTY_TILE_VALUE = "empty-tile" as const;
export type EmptyTileValue = typeof EMPTY_TILE_VALUE;
export type TileValue = number | EmptyTileValue;

export type Tile = {
  id: string;
  value: TileValue;
  position: Position;
  selected?: boolean;
};

export type EmptyTile = Tile & {
  value: EmptyTileValue;
};

export type TileValueArray = TileValue[];
export type TileArray = Tile[];

export const isEmpty = (value: TileValue): value is EmptyTileValue =>
  value === EMPTY_TILE_VALUE;

export const isEmptyTile = (tile: Tile): tile is EmptyTile =>
  isEmpty(tile.value);

export const fromValues = (values: TileValueArray, rank: Rank): TileArray =>
  values.map((value, index) => ({
    id: `tile-${index}`,
    value,
    position: { row: Math.floor(index / rank), col: index % rank },
  }));
