import type { Rank } from "../concepts/grid";
import { EMPTY_TILE_VALUE, type TileArray } from "../concepts/tile";

type matrix = number[][];

export class PuzzleState {
  private puzzle: matrix;
  private _moves: number = 0;
  private _cost: number = 0;

  constructor(data: TileArray, rank: Rank) {
    this.puzzle = Array.from({ length: rank }, () => Array(rank).fill(0));
    data.forEach((tile) => {
      const { row, col } = tile.position;
      this.puzzle[row][col] = tile.value === EMPTY_TILE_VALUE ? 0 : tile.value;
    });
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

  isSolved(rank: Rank): boolean {
    return this.display() === FINAL_STATE[rank];
  }

  updateCost() {}
}

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
