import type { Direction, Position, Rank } from "../concepts/grid";
import { eq, type Matrix } from "../concepts/matrix";
import { EMPTY_TILE_VALUE, type TileArray } from "../concepts/tile";
import { manhattan } from "./manhattan";

export class PuzzleState {
  private static _solved: Map<Rank, Matrix> = new Map();

  private puzzle: Matrix;
  private _rank: Rank;
  private _moves: number = 0;

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
    return a.cost - b.cost;
  }

  get moves(): number {
    return this._moves;
  }

  get rank(): Rank {
    return this._rank;
  }

  get cost() {
    return this._moves + this.heuristic();
  }

  set moves(value: number) {
    this._moves = value;
  }

  getMoves(): Direction[] {
    const empty = this.emptyTile;
    const directions: Direction[] = [];
    if (empty.row < this._rank - 1) directions.push("down");
    if (empty.row > 0) directions.push("up");
    if (empty.col < this._rank - 1) directions.push("right");
    if (empty.col > 0) directions.push("left");
    return directions;
  }

  isSolved(): boolean {
    return eq(this.puzzle, this.solved);
  }

  isSolvable(): boolean {
    const emptyTileRow = this.puzzle.findIndex((row) => row.includes(0));
    if (emptyTileRow === -1) {
      throw new Error("No empty tile found in the puzzle.");
    }

    const inversions = countInversions(this.puzzle);

    const isEvenRank = this.rank % 2 === 0;
    const hasEvenInversions = inversions % 2 === 0;
    const isEmptyTileOnEvenRow = emptyTileRow % 2 === 0;

    if (!isEvenRank) {
      return hasEvenInversions;
    }
    // For even rank grids
    return (
      (isEmptyTileOnEvenRow && !hasEvenInversions) ||
      (!isEmptyTileOnEvenRow && hasEvenInversions)
    );
  }

  solveAStar(): void {
    if (this.isSolved()) return;
    if (!this.isSolvable()) {
      throw new Error("Puzzle is not solvable");
    }
  }

  private get emptyTile(): Position {
    for (let i = 0; i < this._rank; i++) {
      for (let j = 0; j < this._rank; j++) {
        if (this.puzzle[i][j] === 0) {
          return { row: i, col: j };
        }
      }
    }
    throw new Error("No empty tile found in the puzzle.");
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

  private heuristic(): number {
    let sum = 0;
    for (let i = 0; i < this._rank; i++) {
      for (let j = 0; j < this._rank; j++) {
        const value = this.puzzle[i][j];
        const [targetX, targetY] =
          value === 0
            ? [this._rank - 1, this._rank - 1]
            : [Math.floor((value - 1) / this._rank), (value - 1) % this._rank];
        sum += manhattan(i, j, targetX, targetY);
      }
    }
    return sum;
  }
}

export const isSolved = (tiles: TileArray, rank: Rank): boolean => {
  const puzzle = new PuzzleState(tiles, rank);
  return puzzle.isSolved();
};

export const isSolvable = (tiles: TileArray, rank: Rank): boolean => {
  const puzzle = new PuzzleState(tiles, rank);
  return puzzle.isSolvable();
};

const countInversions = (matrix: Matrix): number => {
  let inversions = 0;
  const flat = matrix.flat().filter((value) => value !== 0); // Exclude empty tile

  for (let i = 0; i < flat.length - 1; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) {
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
