import { Button } from "./ui/button";
import { useTiles, useTilesDispatch } from "./hooks/tiles-hooks";
import { isBoth } from "../concepts/selected";
import type { Direction } from "../concepts/grid";

export const ActionBar = () => {
  const dispatch = useTilesDispatch();
  const state = useTiles();

  const handleShuffle = () => {
    dispatch({ type: "shuffle" });
  };
  const handleSwitch = () => {
    if (isBoth(state.selected)) {
      dispatch({
        type: "switch",
        first: state.selected.first,
        second: state.selected.second,
      });
      dispatch({ type: "deselect", position: state.selected.first });
      dispatch({ type: "deselect", position: state.selected.second });
    }
  };
  const handleMove = (direction: Direction) => {
    dispatch({ type: "move-empty-tile", direction });
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="my-auto flex flex-col items-center">
        <Button onClick={handleShuffle}>Shuffle</Button>
        <Button onClick={handleSwitch} disabled={!isBoth(state.selected)}>
          Switch
        </Button>
      </div>
      <div className="flex flex-col items-center ml-4">
        <div>
          <Button onClick={() => handleMove("up")}>&#8593;</Button>
        </div>
        <div>
          <Button onClick={() => handleMove("left")}>&#8592;</Button>
          <Button onClick={() => handleMove("down")}>&#8595;</Button>
          <Button onClick={() => handleMove("right")}>&#8594;</Button>
        </div>
      </div>
    </div>
  );
};
