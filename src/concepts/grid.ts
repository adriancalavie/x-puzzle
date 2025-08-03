import { GAP_SIZE, TILE_SIZE } from "../constants/puzzle";
import { clamp } from "../utils/number";
import type { Tile, TileArray } from "./tile";

export type Rank = 3 | 4 | 5 | 6;

export type SquaredRows<T extends Rank> = (typeof MAP_SIZES)[T];

export type Direction = "up" | "down" | "left" | "right";

export type Position = {
  row: number;
  col: number;
};

export const MAP_SIZES = {
  3: 9,
  4: 16,
  5: 25,
  6: 36,
} as const satisfies Record<Rank, number>;

const computeGridSize = (rank: Rank): number => {
  return rank * TILE_SIZE + (rank - 1) * GAP_SIZE;
};

export const GRID_SIZES = {
  3: computeGridSize(3),
  4: computeGridSize(4),
  5: computeGridSize(5),
  6: computeGridSize(6),
} as const satisfies Record<Rank, number>;

export const eq = (pos1: Position, pos2: Position): boolean => {
  return pos1.row === pos2.row && pos1.col === pos2.col;
};

export const toIdx = (position: Position, rank: Rank): number => {
  if (!isInGrid(position, rank)) {
    throw new Error("Position is out of bounds for the grid");
  }
  const idx = position.row * rank + position.col;
  if (!isInBounds(idx, rank)) {
    throw new Error("Index is out of bounds for the grid");
  }
  return idx;
};

export const fromIdx = (idx: number, rank: Rank): Position => {
  if (!isInBounds(idx, rank)) {
    throw new Error("Index is out of bounds for the grid");
  }
  return {
    row: Math.floor(idx / rank),
    col: idx % rank,
  };
};

export const getByPosition = (
  tiles: TileArray,
  position: Position,
  rank: Rank
): Tile => {
  return tiles[toIdx(position, rank)];
};

export const switchTiles = (
  tiles: TileArray,
  position1: Position,
  position2: Position,
  rank: Rank
): TileArray => {
  const nextTiles = [...tiles];
  const tile1 = getByPosition(nextTiles, position1, rank);
  const tile2 = getByPosition(nextTiles, position2, rank);

  nextTiles[toIdx(position1, rank)] = { ...tile2, position: position1 };
  nextTiles[toIdx(position2, rank)] = { ...tile1, position: position2 };

  return nextTiles;
};

const add = (first: Position, second: Position): Position => {
  return {
    row: first.row + second.row,
    col: first.col + second.col,
  };
};

const directions: Record<Direction, Position> = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 },
};

const constrainPosition = (position: Position, rank: Rank): Position => {
  return {
    row: clamp(position.row, 0, rank - 1),
    col: clamp(position.col, 0, rank - 1),
  };
};

export const movePosition = (
  position: Position,
  direction: Direction,
  rank: Rank
): Position => {
  const delta = directions[direction];
  return constrainPosition(add(position, delta), rank);
};

export const getPixelPosition = (position: Position) => ({
  x: position.col * (TILE_SIZE + GAP_SIZE),
  y: position.row * (TILE_SIZE + GAP_SIZE),
});

const isInGrid = (position: Position, rank: Rank): boolean => {
  return (
    position.row >= 0 &&
    position.row < rank &&
    position.col >= 0 &&
    position.col < rank
  );
};

const isInBounds = (idx: number, rank: Rank): boolean => {
  return idx >= 0 && idx < MAP_SIZES[rank];
};

