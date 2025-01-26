import logo from "../assets/images/4.png";
import Search from "./custom/Search";
import Header from "./Header";

function NavBar() {
  return (
    <Header>
      <span className="flex items-end justify-center md:gap-2 gap-0  ">
        <img src={logo} className="w-10 h-10"></img>
        <p className="font-greatVibe capitalize text-xl  md:block hidden">Recipiece</p>
      </span>
      <Search />
    </Header>
  );
}

export default NavBar;
