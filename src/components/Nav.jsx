import { useState } from "react";
import { removeCookie } from "../services/cookie";
import TeamCreateModal from "./TeamCreateModal";

const Nav = () => {
  const [toggle, setToggle] = useState(false); // Toggle for Team modal

  const logout = () => {
    removeCookie("token");
    window.location.reload();
  };

  const openModal = () => {
    setToggle(true);
  };

  return (
    <section id="nav" className="flex justify-between mb-8 px-16 pt-8">
      <button
        className="bg-red-300 text-lg font-bold px-2 py-1 hover:bg-red-500"
        type="button"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-300 text-lg font-bold px-2 py-1 hover:bg-green-500"
        type="button"
        onClick={openModal}
      >
        Create a Team
      </button>
      {toggle && <TeamCreateModal setToggle={setToggle} />}
    </section>
  );
};

export default Nav;
