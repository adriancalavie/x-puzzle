import type { Rank } from "../concepts/grid";
import { eq, type Matrix } from "../concepts/matrix";
import {
  EMPTY_TILE_VALUE,
  isEmptyTile,
  type TileArray,
} from "../concepts/tile";

export class PuzzleState {
  private static _solved: Map<Rank, Matrix> = new Map();

  private puzzle: Matrix;
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

  get rank(): Rank {
    return this._rank;
  }

  set moves(value: number) {
    this._moves = value;
  }

  isSolved(): boolean {
    return eq(this.puzzle, this.solved);
  }

  private get solved(): Matrix {
    return PuzzleState.getSolved(this._rank);
  }

  private static getSolved(rank: Rank): Matrix {
    if (!this._solved.has(rank)) {
      const solved: Matrix = Array.from({ length: rank }, () =>
        Array(rank).fill(0)
      );
      for (let i = 0; i < rank; i++) {
        for (let j = 0; j < rank; j++) {
          solved[i][j] = i * rank + j + 1;
        }
      }
      solved[rank - 1][rank - 1] = 0; // Empty tile
      this._solved.set(rank, solved);
    }
    return this._solved.get(rank)!;
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

const serialize = (puzzle: Matrix): string => {
  return puzzle
    .map((row) => row.map((value) => (value === 0 ? " " : value)).join(" | "))
    .join("\n");
};
