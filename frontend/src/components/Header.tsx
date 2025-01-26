import { typeChildren } from "../providers/TypeProvider"

function Header({children}:typeChildren) {
  return (
    <header className='flex font-bold text-sm   uppercase justify-between items-center md:border-b mb-4 bg-white md:p-4 rounded-md '>
      {children}
    </header>
  )
}

export default Header
