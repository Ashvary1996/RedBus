import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav bg-white shadow-md flex justify-between items-center px-5 py-3 font-semibold">
      <ul className="nav1 flex">
        <Link
          to="/home"
          className="nav-item font-bold text-orange-500 hover:text-orange-700 mr-4"
        >
          RESERVE
        </Link>
        <Link to="/ticket" className="nav-item hover:text-gray-700 mr-4">
          Ticket
        </Link>
        <li className="nav-item hover:text-gray-700">Contact us</li>
      </ul>
      <ul className="nav2 flex">
        <li className="nav-item bg-orange-500 text-white rounded-md py-2 px-4 mr-4 cursor-pointer hover:bg-orange-600">
          Login
        </li>
        <li className="nav-item cursor-pointer  bg-green-500 text-white rounded-md py-2 px-4 mr-4   hover:bg-green-600">
          Register
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
