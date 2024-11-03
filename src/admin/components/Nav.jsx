import React from "react";

const Nav = ({ onToggleSidebar, onToggleDarkMode, darkMode }) => {

  

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <button onClick={onToggleSidebar} className="md:hidden p-2 rounded-lg text-white hover:bg-gray-700">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <div className="text-lg font-semibold">Admin Dashboard</div>
    <div>
      <button onClick={onToggleDarkMode} className="p-2 rounded-lg text-white hover:bg-gray-700">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
   
  </nav>
  );
};

export default Nav;
