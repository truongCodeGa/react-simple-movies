import React from "react";
import { NavLink } from "react-router-dom";
const NotFound404 = () => {
  return (
    <div
      className=" skele404 w-[500px] p-4 rounded-md
       mx-auto h-64 text-pur font-medium
    "
    >
      <h1 className="text-5xl text-center ">
        <span className="text-6xl">404</span>
        <br />
        ERROR
        <br />
        NOT FOUND
      </h1>
      <div className="text-center mt-5">
        <NavLink
          className="bg-gradient-to-r text-white
        p-2 rounded-md transition-colors
        from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
          to="/"
        >
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound404;
