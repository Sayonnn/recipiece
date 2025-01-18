import { ReactNode } from "react"

type typeLogo = {
    children:ReactNode
}

function Logo({children}:typeLogo) {
  return (
    <span className="font-bold text-2xl ">
      {children}
    </span>
  )
}

export default Logo
