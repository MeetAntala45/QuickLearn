import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const educatorData = dummyEducatorData
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:pr-14 lg:pr-36 border-b border-gray-500 py-4 bg-gray-100/70">
      
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 lg:w-40" />
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi! {user ? user.fullName : "Developer"}</p>
        {user ? (
          <UserButton />
        ) : (
          <img className="max-w-8" src={assets.profile_img} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
