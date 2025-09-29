import { describe, test, expect } from "bun:test";
import {
  EMPTY_TILE_VALUE as EMPTY,
  fromValues,
  type TileArray,
} from "../concepts/tile";
import { isSolvable, PuzzleState } from "./puzzle";

describe("PuzzleState", () => {
  describe("creation", () => {
    test("should create a puzzle from tile array", () => {
      const rank = 3;
      // prettier-ignore
      const tileArray: TileArray = fromValues([
        1, 2, EMPTY,
        3, 4, 5,
        6, 7, 8
      ], rank);

      const puzzle = new PuzzleState(tileArray, rank);
      const display = puzzle.display();

      expect(display).toBe("1 | 2 |  \n3 | 4 | 5\n6 | 7 | 8");
    });

    test("should create correct sized grid based on rank", () => {
      const rank = 4;
      const tileArray: TileArray = fromValues([1], rank);

      const puzzle4x4 = new PuzzleState(tileArray, rank);
      const display4x4 = puzzle4x4.display();

      // Should have 4 rows and 4 columns
      const rows = display4x4.split("\n");
      expect(rows).toHaveLength(4);
      expect(rows[0].split(" | ")).toHaveLength(4);
    });
  });

  describe("isSolved", () => {
    test("should recognize solved state", () => {
      const rank = 3;
      // prettier-ignore
      const solvedTileArray: TileArray = fromValues([
        1, 2, 3,
        4, 5, 6,
        7, 8, EMPTY
      ], rank);

      const puzzle = new PuzzleState(solvedTileArray, rank);
      expect(puzzle.isSolved()).toBe(true);
    });
  });
  describe("isSolvable", () => {
    test("should recognize solvable state for rank 3", () => {
      const rank = 3;
      // prettier-ignore
      const solvableTileArray: TileArray = fromValues([
        1, 2, 3,
        4, 5, 6,
        7, EMPTY, 8
      ], rank);

      expect(isSolvable(solvableTileArray, rank)).toBe(true);
    });

    test("should recognize unsolvable state for rank 3", () => {
      const rank = 3;
      // prettier-ignore
      const unsolvableTileArray: TileArray = fromValues([
        1, 2, 3,
        4, 5, 6,
        8, 7, EMPTY
      ], rank);

      expect(isSolvable(unsolvableTileArray, rank)).toBe(false);
    });

    test("should recognize unsolvable state for rank 4", () => {
      const rank = 4;
      // prettier-ignore
      const unsolvableTileArray: TileArray = fromValues([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 15, 14, EMPTY
      ], rank);

      expect(isSolvable(unsolvableTileArray, rank)).toBe(false);
    });
  });
});
