import Logo from "./custom/Logo"

function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4  ">
      <Logo>Sayon</Logo>
        <span>About me</span>
    </nav>
  )
}

export default NavBar
