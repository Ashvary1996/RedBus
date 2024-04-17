import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav bg-white shadow-md flex justify-between items-center px-5 py-3 font-semibold">
      <ul className="nav1 flex flex-wrap">
        <li className="nav-item">
          <Link
            to="/home"
            className="nav-link font-bold text-orange-500 hover:text-orange-700 mr-4"
          >
            RESERVE
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ticket" className="nav-link hover:text-gray-700 mr-4">
            Ticket
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link hover:text-gray-700 mr-4">
            Contact us
          </Link>
        </li>
      </ul>
      <ul className="nav2 flex">
        <li className="nav-item">
          <button className="nav-button bg-orange-500 text-white rounded-md py-2 px-4 mr-4 cursor-pointer hover:bg-orange-600">
            Login
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button bg-green-500 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-green-600">
            Register
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
