import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full items-center justify-between p-4 z-[100] absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          FAVFLIX
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="border text-white px-6 py-2 mr-4 rounded cursor-pointer hover:bg-white hover:text-gray-900">
              Account
            </button>
          </Link>
            <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-white hover:text-red-600">
              Logout
            </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="border text-white px-6 py-2 mr-4 rounded cursor-pointer hover:bg-white hover:text-gray-900">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white hover:bg-white hover:text-red-600">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
