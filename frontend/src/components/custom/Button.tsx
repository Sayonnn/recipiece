import { ReactNode } from "react";

type typeButton = {
    type:"reset" | "button" | "submit",
    onClick?: () => void;
    children:ReactNode
}
function Button({type,onClick,children} :typeButton) {
  return (
    <button type = {type} onClick={onClick} className="p-2 border rounded-lg grid place-content-center">
      {children}
    </button>
  )
}

export default Button
