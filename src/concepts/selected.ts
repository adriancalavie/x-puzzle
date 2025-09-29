import { isNull, notNull } from "../utils/nullity";
import { eq, type Position } from "./grid";
import type { Pair } from "./pair";

export type None = Pair<null, null>;
export type One = Pair<Position, null>;
export type Both = Pair<Position, Position>;
export type SelectedTiles = None | One | Both;
export type AtLeastOne = One | Both;
export type AtMostOne = None | One;

export const isNone = (selected: SelectedTiles): selected is None =>
  isNull(selected.first) && isNull(selected.second);

export const isOne = (selected: SelectedTiles): selected is One =>
  notNull(selected.first) && isNull(selected.second);

export const isBoth = (selected: SelectedTiles): selected is Both =>
  notNull(selected.first) && notNull(selected.second);

export const none = (): None => ({
  first: null,
  second: null,
});

export const one = (first: Position): One => ({
  first,
  second: null,
});

export const both = (first: Position, second: Position): Both => ({
  first,
  second,
});

export const select = (selected: AtMostOne, position: Position): AtLeastOne => {
  if (isNone(selected)) {
    return one(position);
  }
  return both(selected.first, position);
};

export const deselect = (
  selected: AtLeastOne,
  position: Position
): AtMostOne => {
  const positions = [selected.first, selected.second];

  const [nextFirst, nextSecond] = positions
    .map((pos) => (pos && eq(pos, position) ? null : pos))
    .filter(notNull);

  return fromValues(nextFirst, nextSecond) as AtMostOne;
};
export const fromValues = (
  first: Position | null,
  second: Position | null
): SelectedTiles => {
  const validPositions = [first, second].filter(notNull);

  switch (validPositions.length) {
    case 0:
      return none();
    case 1:
      return one(validPositions[0]);
    default:
      return both(validPositions[0], validPositions[1]);
  }
};
