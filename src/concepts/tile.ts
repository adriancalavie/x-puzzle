import { type Position } from "./grid";

export const EMPTY_TILE_VALUE = "empty-tile" as const;
export type EmptyTileValue = typeof EMPTY_TILE_VALUE;
export type TileValue = number | EmptyTileValue;

export type Tile = {
  id: string;
  value: TileValue;
  position: Position;
  selected?: boolean;
};

export type TileValueArray = TileValue[];
export type TileArray = Tile[];

export const isEmpty = (value: TileValue): value is EmptyTileValue =>
  value === EMPTY_TILE_VALUE;
