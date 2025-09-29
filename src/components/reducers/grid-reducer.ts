import { isSolvable, isSolved } from "../../algorithm/puzzle";
import {
  eq,
  fromIdx,
  movePosition,
  switchTiles,
  type Direction,
  type Position,
  type Rank,
} from "../../concepts/grid";
import {
  deselect,
  isBoth,
  isNone,
  isOne,
  none,
  select,
  type SelectedTiles,
} from "../../concepts/selected";
import { isEmpty, type TileArray } from "../../concepts/tile";
import { randomTiles } from "../../utils/randomTiles";

export type GridState = {
  tiles: TileArray;
  rank: Rank;
  selected: SelectedTiles;
  solved: boolean;
  solvable: boolean;
};

type ShuffleAction = {
  type: "shuffle";
};

type SelectTileAction = {
  type: "select";
  position: Position;
};

type DeselectTileAction = {
  type: "deselect";
  position: Position;
};

type SwitchTilesAction = {
  type: "switch";
  first: Position;
  second: Position;
};

type MoveEmptyTileAction = {
  type: "move-empty-tile";
  direction: Direction;
};

export type GridAction =
  | ShuffleAction
  | SelectTileAction
  | DeselectTileAction
  | SwitchTilesAction
  | MoveEmptyTileAction;

function handleShuffle(state: GridState): GridState {
  const randomValues = randomTiles(state.rank);
  return {
    ...state,
    tiles: state.tiles.map((tile, idx) => ({
      ...tile,
      value: randomValues[idx],
    })),
  };
}

function handleSelect(state: GridState, action: SelectTileAction): GridState {
  const { position } = action;
  const { selected: prev, tiles } = state;
  if (isBoth(prev)) {
    return {
      ...state,
      selected: none(),
      tiles: tiles.map((tile) => ({
        ...tile,
        selected: false,
      })),
    };
  }

  if (isOne(prev) && eq(prev.first, position)) {
    return {
      ...state,
      selected: none(),
      tiles: tiles.map((tile) => ({
        ...tile,
        selected: false,
      })),
    };
  }

  return {
    ...state,
    selected: select(prev, position),
    tiles: tiles.map((tile) => {
      return eq(tile.position, position) ? { ...tile, selected: true } : tile;
    }),
  };
}

function handleDeselect(
  state: GridState,
  action: DeselectTileAction
): GridState {
  const { position } = action;
  const { selected: prev, tiles } = state;
  if (isNone(prev)) {
    return state;
  }

  return {
    ...state,
    selected: deselect(prev, position),
    tiles: tiles.map((tile) => {
      return eq(tile.position, position) ? { ...tile, selected: false } : tile;
    }),
  };
}

function handleMoveEmptyTile(
  state: GridState,
  action: MoveEmptyTileAction
): GridState {
  const emptyTile = state.tiles.find((til) => isEmpty(til.value));
  if (!emptyTile) {
    console.warn("No empty tile found to move");
    return state;
  }

  const { position } = emptyTile;
  const nextPosition = movePosition(position, action.direction, state.rank);

  if (eq(nextPosition, position)) {
    console.warn("Cannot move empty tile in that direction");
    return state;
  }

  const nextTiles = switchTiles(
    state.tiles,
    position,
    nextPosition,
    state.rank
  );
  console.log(
    "Selected tiles:",
    nextTiles.filter((t) => t.selected)
  );
  console.log("State selected:", state.selected);

  return {
    ...state,
    tiles: nextTiles,
    selected: none(),
    solved: isSolved(nextTiles, state.rank),
    solvable: isSolvable(nextTiles, state.rank),
  };
}

function handleSwitch(state: GridState, action: SwitchTilesAction): GridState {
  const { first, second } = action;
  const { tiles, rank } = state;

  const nextTiles = switchTiles(tiles, first, second, rank);

  return {
    ...state,
    tiles: nextTiles,
    selected: none(),
    solved: isSolved(nextTiles, rank),
    solvable: isSolvable(nextTiles, rank),
  };
}

export function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case "shuffle":
      return handleShuffle(state);
    case "select":
      return handleSelect(state, action);
    case "deselect":
      return handleDeselect(state, action);
    case "switch":
      return handleSwitch(state, action);
    case "move-empty-tile":
      return handleMoveEmptyTile(state, action);
  }
}

export const initialState = (rank: Rank): GridState => {
  const tiles: TileArray = randomTiles(rank).map((value, idx) => ({
    id: crypto.randomUUID(),
    value,
    position: fromIdx(idx, rank),
  }));

  return {
    tiles,
    rank,
    selected: none(),
    solved: isSolved(tiles, rank),
    solvable: isSolvable(tiles, rank),
  };
};
