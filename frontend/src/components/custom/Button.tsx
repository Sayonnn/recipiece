import { ReactNode } from "react";

type typeButton = {
    type:"reset" | "button" | "submit",
    onClick?: () => void;
    children:ReactNode;
    style?:string;
}
function Button({type,onClick,children,style} :typeButton) {
  return (
    <button type = {type} onClick={onClick} className={`p-2 border rounded-lg grid place-content-center transition duration-200 ease-linear ${style}`}>
      {children}
    </button>
  )
}

export default Button
