import type { Rank } from "../concepts/grid";
import {
  EMPTY_TILE_VALUE,
  isEmptyTile,
  type TileArray,
} from "../concepts/tile";

type matrix = number[][];

export class PuzzleState {
  private puzzle: matrix;
  private _rank: Rank;
  private _moves: number = 0;
  private _cost: number = 0;

  constructor(data: TileArray, rank: Rank) {
    this.puzzle = Array.from({ length: rank }, () => Array(rank).fill(0));
    data.forEach((tile) => {
      const { row, col } = tile.position;
      this.puzzle[row][col] = tile.value === EMPTY_TILE_VALUE ? 0 : tile.value;
    });
    this._rank = rank;
  }

  display(): string {
    return serialize(this.puzzle);
  }

  static comparator(a: PuzzleState, b: PuzzleState): number {
    return a._cost - b._cost;
  }

  get moves(): number {
    return this._moves;
  }

  get cost(): number {
    return this._cost;
  }

  set moves(value: number) {
    this._moves = value;
  }

  isSolved(): boolean {
    return this.display() === FINAL_STATE[this._rank];
  }

  updateCost() {}
}

export const isSolved = (tiles: TileArray, rank: Rank): boolean => {
  const puzzle = new PuzzleState(tiles, rank);
  return puzzle.isSolved();
};

export const isSolvable = (tiles: TileArray, rank: Rank): boolean => {
  const emptyTile = tiles.find((tile) => isEmptyTile(tile));
  if (!emptyTile) {
    throw new Error("No empty tile found in the puzzle.");
  }

  const inversions = countInversions(tiles);

  const isEvenRank = rank % 2 === 0;
  const hasEvenInversions = inversions % 2 === 0;
  const isEmptyTileOnEvenRow = emptyTile.position.row % 2 === 0;

  if (!isEvenRank) {
    return hasEvenInversions;
  }

  // For even rank grids
  return (
    (isEmptyTileOnEvenRow && !hasEvenInversions) ||
    (!isEmptyTileOnEvenRow && hasEvenInversions)
  );
};

const countInversions = (tiles: TileArray): number => {
  let inversions = 0;
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (isEmptyTile(tiles[i]) || isEmptyTile(tiles[j])) {
        continue;
      }
      if (tiles[i].value > tiles[j].value) {
        inversions++;
      }
    }
  }
  return inversions;
};

const serialize = (puzzle: matrix): string => {
  return puzzle
    .map((row) => row.map((value) => (value === 0 ? " " : value)).join(" | "))
    .join("\n");
};

const FINAL_STATE = {
  3: "1 | 2 | 3\n4 | 5 | 6\n7 | 8 |  ",
  4: "1 | 2 | 3 | 4\n5 | 6 | 7 | 8\n9 | 10 | 11 | 12\n13 | 14 | 15 |  ",
  5: "1 | 2 | 3 | 4 | 5\n6 | 7 | 8 | 9 | 10\n11 | 12 | 13 | 14 | 15\n 16 | 17 | 18 | 19 | 20\n21 | 22 | 23 | 24 |  ",
  6: "1 | 2 | 3 | 4 | 5 | 6\n7 | 8 | 9 | 10 | 11 | 12\n13 | 14 | 15 | 16 | 17 | 18\n19 | 20 | 21 | 22 | 23 | 24\n25 | 26 | 27 | 28 | 29 | 30\n31 | 32 | 33 | 34 | 35 |  ",
} as const satisfies Record<Rank, string>;
