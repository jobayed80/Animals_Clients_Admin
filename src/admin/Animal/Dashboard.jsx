import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import ProductAdd from "../components/ProductAdd";
import Banner from "../components/Banner";
import ProductTable from "../components/ProductTable";
import ProductManagement from "../components/ProductManagement ";
import CardData from "../components/CardData";

const Dashboard = ({ onLogout }) => {


  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("home");

  const handleSelectMenu = (menu) => {
    setActiveMenu(menu);
  };
  const [selectedMenu, setSelectedMenu] = useState("home");

  // Render content based on selectedMenu
  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return (
          <>
            <Banner />
            <ProductTable /> {/* Example Table */}
          </>
        );
      case "product":
        return (
          <>
            <ProductAdd />
            <ProductManagement />
          </>
        );
      case "orders":
        return <div>Order Management Content</div>;

      case "logout":
        return (
          <>
            {onLogout()}
          </>
        );
      // Add more cases for additional menus
      default:
        return <div>Content Not Found</div>;
    }
  };


  return (
    <>

      <div  className={`flex h-screen overflow-hidden ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <Sidebar isOpen={isOpen} onSelectMenu={handleSelectMenu} activeMenu={activeMenu} />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Nav onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />


          {/* Dynamic Content */}
          <main  className="flex-1 mt-6 p-6 overflow-y-auto">
            {/* Main Content Area */}
            <div className="flex-1 p-6">
              {activeMenu === "home" &&
               <div>
                 <Banner />
                 <CardData></CardData>
                 <ProductTable /> {/* Example Table */}
                </div>}

              {activeMenu === "product" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Product Dashboard</h2>
                  <ProductAdd />
                  <ProductManagement />
                </div>
              )}

              {activeMenu === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Animals Table</h2>
                  <ProductTable /> 
                </div>
              )}

              {activeMenu === "logout" && <div>You have logged out.</div>}
            </div>
          </main>
        </div>
      </div>


    </>
  );
};

export default Dashboard;
