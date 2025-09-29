import { useTiles } from "../hooks/tiles-hooks";

export const Solved = () => {
  const { solved } = useTiles();
  return <div>Solved: {JSON.stringify(solved)}</div>;
};
