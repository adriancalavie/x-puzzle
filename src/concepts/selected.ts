import { eq, type Position } from "./grid";
import type { Pair } from "./pair";

export type None = Pair<null, null>;
export type One = Pair<Position, null>;
export type Both = Pair<Position, Position>;
export type SelectedTiles = None | One | Both;
export type AtLeastOne = One | Both;
export type AtMostOne = None | One;

export const isNone = (selected: SelectedTiles): selected is None =>
  selected.first === null && selected.second === null;

export const isOne = (selected: SelectedTiles): selected is One =>
  selected.first !== null && selected.second === null;

export const isBoth = (selected: SelectedTiles): selected is Both =>
  selected.first !== null && selected.second !== null;

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
): SelectedTiles => {
  const positions = [selected.first, selected.second];

  const isPositionSelected = positions.some((pos) => pos && eq(pos, position));
  if (!isPositionSelected) {
    return selected;
  }

  const [nextFirst, nextSecond] = positions.map((pos) =>
    pos && eq(pos, position) ? null : pos
  );

  return fromValues(nextFirst, nextSecond);
};
export const fromValues = (
  first: Position | null,
  second: Position | null
): SelectedTiles => {
  const notNull = [first, second].filter((pos) => pos !== null);

  switch (notNull.length) {
    case 0:
      return none();
    case 1:
      return one(notNull[0]);
    default:
      return both(notNull[0], notNull[1]);
  }
};
