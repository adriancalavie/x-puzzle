import { Selected } from "./selected";
import { Solvable } from "./solvable";
import { Solved } from "./solved";

export type DebugProps = {
  show?: boolean;
};

export const Debug = ({ show }: DebugProps) => {
  return show ? (
    <>
      <Selected />
      <Solved />
      <Solvable />
    </>
  ) : null;
};
