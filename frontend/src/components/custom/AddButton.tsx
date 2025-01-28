import { useState } from "react";
import { icons } from "../../utils/icons";
import gsap from "gsap";
import { useGraphQL } from "../../contexts/graphql";

function AddButton() {
  const { toggleModal } = useGraphQL();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
    gsap.to("#menuTogglerContainer", {
      duration: 0.02,
      rotation: isActive ? 0 : 90,
      ease: "power1.inOut",
    });
    gsap.to("#add", {
      duration: 0.02,
      rotation: isActive ? 0 : 90,
      ease: "power1.inOut",
    });
    gsap.to("#logout", {
      duration: 0.02,
      rotation: isActive ? 0 : -90,
      ease: "power1.inOut",
    });
  };

  const goLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <span
      className={`fixed bottom-4 right-4 z-20 text-white md:p-4 border-4 border-orange-200 hover:bg-orange-50 
         hover:text-orange-950 transition duration-200  p-2 rounded-full bg-red-950 shadow-md cursor-pointer`}
      onClick={toggleActive}
      id="menuTogglerContainer"
      title="Click to view menus"
    >
      {icons.iFork}

      <button
        className={`absolute rotate-90 bottom-[-20px] right-[73px]  p-2 duration-200 transition  rounded-full  ${
          isActive
            ? "text-orange-950 bg-orange-50 border-4 border-orange-100 hover:border-orange-950"
            : "text-transparent bg-none"
        }`}
        title="Create Recipe"
        id="add"
        onClick={(e) => toggleModal(e)}
      >
        {icons.iAddCircleFill}
      </button>
      <span
        className={`absolute  bottom-[-65px] right-[30px] -rotate-90  p-2 duration-200 transition  rounded-full  ${
          isActive
            ? "text-orange-950 bg-orange-50 border-4 border-orange-100 hover:border-orange-950"
            : "text-transparent bg-none"
        }`}
        id="logout"
        title="Logout"
        onClick={goLogout}
      >
        {icons.iHomeFill}
      </span>
    </span>
  );
}

export default AddButton;
