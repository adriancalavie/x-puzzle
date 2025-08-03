import { motion } from "framer-motion";
import { getPixelPosition, type Position } from "../concepts/grid";
import { isEmpty, type TileValue } from "../concepts/tile";
import { useTilesDispatch } from "./hooks/tiles-hooks";

export type TileProps = {
  value: TileValue;
  position: Position;
  selected?: boolean;
  animated?: boolean;
};

export const Tile = ({
  value,
  position,
  selected,
  animated = false,
}: TileProps) => {
  const dispatch = useTilesDispatch();

  const pixelPosition = getPixelPosition(position);

  const handleClick = () => {
    dispatch({ type: "select", position });
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch({ type: "deselect", position });
  };

  const tileClass = selected
    ? "bg-blue-500 text-white"
    : "bg-neutral-900 text-white";

  const baseStyles = `
    ${tileClass} w-[100px] h-[100px] rounded-xl
    flex items-center justify-center select-none flex-col
    text-4xl font-bold
    hover:brightness-125
    ${animated ? "absolute top-0 left-0 z-10" : ""}
    cursor-pointer
  `;

  const MotionComponent = animated ? motion.div : "div";

  return (
    <MotionComponent
      className={baseStyles}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      {...(animated && {
        animate: {
          x: pixelPosition.x,
          y: pixelPosition.y,
        },
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      })}
    >
      {isEmpty(value) ? null : value}
    </MotionComponent>
  );
};
