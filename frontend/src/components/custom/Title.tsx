import { ReactNode } from "react"

type typeTitle = {
    children:ReactNode
}

function Title({children} : typeTitle) {
  return (
    <h3 className='flex font-bold text-sm p-2 border uppercase justify-between items-center'>
        {children}
    </h3>
  )
}

export default Title
