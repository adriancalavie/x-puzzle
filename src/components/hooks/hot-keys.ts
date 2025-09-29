import { useEffect } from "react";
import type { Direction } from "../../concepts/grid";

type Key = KeyboardEvent["key"];

export function useHotkeys<T extends readonly string[] = Key[]>(
  keys: T,
  handler: (e: KeyboardEvent) => void,
  options?: {
    preventDefault?: boolean;
    ignoreInInputs?: boolean;
  }
) {
  const { preventDefault = false, ignoreInInputs = true } = options ?? {};

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (ignoreInInputs) {
        const el = e.target as HTMLElement;
        if (
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable
        ) {
          return;
        }
      }

      if (keys.includes(e.key)) {
        if (preventDefault) e.preventDefault();
        handler(e);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handler, preventDefault, ignoreInInputs, keys]);
}

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"] as const;
export function useArrowKeys(handler: (direction: Direction) => void) {
  useHotkeys(ARROW_KEYS, (e) => {
    switch (e.key as (typeof ARROW_KEYS)[number]) {
      case "ArrowLeft":
        handler("left");
        break;
      case "ArrowRight":
        handler("right");
        break;
      case "ArrowUp":
        handler("up");
        break;
      case "ArrowDown":
        handler("down");
        break;
      default:
        throw new Error("Unhandled arrow key");
    }
  });
}
