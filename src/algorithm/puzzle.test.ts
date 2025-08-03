import { describe, test, expect } from "bun:test";
import { EMPTY_TILE_VALUE, type TileArray } from "../concepts/tile";
import { PuzzleState } from "./puzzle";

describe("PuzzleState", () => {
  test("should create a puzzle from tile array", () => {
    const tileArray: TileArray = [
      { id: "1", value: 1, position: { row: 0, col: 0 } },
      { id: "2", value: 2, position: { row: 0, col: 1 } },
      { id: "3", value: EMPTY_TILE_VALUE, position: { row: 0, col: 2 } },
      { id: "4", value: 3, position: { row: 1, col: 0 } },
      { id: "5", value: 4, position: { row: 1, col: 1 } },
      { id: "6", value: 5, position: { row: 1, col: 2 } },
      { id: "7", value: 6, position: { row: 2, col: 0 } },
      { id: "8", value: 7, position: { row: 2, col: 1 } },
      { id: "9", value: 8, position: { row: 2, col: 2 } },
    ];

    const puzzle = new PuzzleState(tileArray, 3);
    const display = puzzle.display();

    expect(display).toBe("1 | 2 |  \n3 | 4 | 5\n6 | 7 | 8");
  });

  test("should create correct sized grid based on rank", () => {
    const tileArray: TileArray = [
      { id: "1", value: 1, position: { row: 0, col: 0 } },
    ];

    const puzzle4x4 = new PuzzleState(tileArray, 4);
    const display4x4 = puzzle4x4.display();

    // Should have 4 rows and 4 columns
    const rows = display4x4.split("\n");
    expect(rows).toHaveLength(4);
    expect(rows[0].split(" | ")).toHaveLength(4);
  });

  test("should recognize solved state", () => {
    const rank = 3;
    const solvedTileArray: TileArray = [
      { id: "1", value: 1, position: { row: 0, col: 0 } },
      { id: "2", value: 2, position: { row: 0, col: 1 } },
      { id: "3", value: 3, position: { row: 0, col: 2 } },
      { id: "4", value: 4, position: { row: 1, col: 0 } },
      { id: "5", value: 5, position: { row: 1, col: 1 } },
      { id: "6", value: 6, position: { row: 1, col: 2 } },
      { id: "7", value: 7, position: { row: 2, col: 0 } },
      { id: "8", value: 8, position: { row: 2, col: 1 } },
      { id: "9", value: EMPTY_TILE_VALUE, position: { row: 2, col: 2 } },
    ];

    const puzzle = new PuzzleState(solvedTileArray, rank);
    expect(puzzle.isSolved(rank)).toBe(true);
  });
});
