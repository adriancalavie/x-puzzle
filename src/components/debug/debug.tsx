import { Selected } from "./selected";
import { Solved } from "./solved";

export type DebugProps = {
  show?: boolean;
};

export const Debug = ({ show }: DebugProps) => {
  return show ? (
    <>
      <Selected />
      <Solved />
    </>
  ) : null;
};
