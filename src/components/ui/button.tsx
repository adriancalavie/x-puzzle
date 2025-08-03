import type { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="
        m-2 px-4 py-2 
        bg-amber-700 rounded 
        hover:brightness-125 hover:disabled:brightness-100
        active:brightness-75 active:disabled:brightness-100
        disabled:bg-neutral-500 disabled:cursor-not-allowed
        select-none
      "
    >
      {props.children}
    </button>
  );
};
