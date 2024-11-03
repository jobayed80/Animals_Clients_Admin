import React from "react";

const Sidebar = ({ isOpen, onSelectMenu, activeMenu }) => {
  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Product", id: "product" },
    { label: "Orders", id: "orders" },
    { label: "Logout", id: "logout" },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}>
      <div className="p-4 text-lg font-semibold">Menu</div>
      <ul className="space-y-2 mt-[0.7rem]">
        {menuItems.map((menu) => (
          <li key={menu.id}>
            <button
              onClick={() => onSelectMenu(menu.id)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
                activeMenu === menu.id ? "bg-gray-700 text-blue-400" : ""
              }`}
            >
              {menu.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
