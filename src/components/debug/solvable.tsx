import { useTiles } from "../hooks/tiles-hooks";

export const Solvable = () => {
  const { solvable } = useTiles();
  return <div>Solvable: {JSON.stringify(solvable)}</div>;
};
