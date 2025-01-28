import { typeButton } from "../../providers/TypeProvider";


function Button({type,onClick,children,style} :typeButton) {
  return (
    <button type = {type} onClick={onClick} className={`p-2 border rounded-lg grid place-content-center transition duration-200 ease-linear ${style}`}>
      {children}
    </button>
  )
}

export default Button
