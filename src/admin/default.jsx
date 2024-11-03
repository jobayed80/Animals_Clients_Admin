import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from 'react-router'
import { Dashboard } from '@mui/icons-material';
import ProductAdd from './components/ProductAdd';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import ProductManagement from './components/ProductManagement ';


const Admin = ({ onLogout }) => {

  // Handle logout
  const handleLogout = () => {
    onLogout();
  };


  return (
    <>
      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/nav' element={<Nav handleLogout={handleLogout} />} />
        <Route path='product' element={<ProductAdd />} />
        <Route path='product/manage' element={<ProductManagement />} />

      </Routes>

      <button onClick={handleLogout}>Logout</button>

    </>
  )
}

export default Admin