import React, { useState, useEffect } from 'react'
import Nav from './comp/nav'
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom'
import Rout from './comp/rout'
import Footer from './comp/footer'
import Homeproduct from './comp/home_product'
import Signin from './auth/signin'
import Admin from './admin/default'
import Signup from './auth/signup'
import Loading from './comp/loading'
import './index.css'
import Dashboard from './admin/Animal/Dashboard'
import Navadmin from './admin/components/Nav'
import ProductManagement from './admin/components/ProductManagement '


const ProtectedRoute = ({ isAdmin, children }) => {
  // Redirect to Signin if admin is not logged in
  if (!isAdmin) {
    return <Navigate  to="/admin" replace />;
  }
  return children;
};



const App = () => {


  // Add To cart
  const [cart, setCart] = useState([])
  const Swal = require('sweetalert2')





  //Shop Page product
  const [shop, setShop] = useState(Homeproduct)
  //Shop Search Filter
  const [search, setSearch] = useState('')
  //Shop category filter
  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => {
      return product.cat === x
    })
    setShop(catefilter)
  }
  const allcatefilter = () => {
    setShop(Homeproduct)
  }
  //Shop Search Filter
  const searchlength = (search || []).length === 0
  const searchproduct = () => {
    if (searchlength) {
      alert("Please Search Something !")
      setShop(Homeproduct)
    }
    else {

      const searchfilter = Homeproduct.filter((x) => {
        return x.cat === search
      })
      setShop(searchfilter)
    }
  }
  //Add To cart
  const addtocart = (product) => {
    const exist = cart.find((x) => {
      return x.id === product.id
    })
    if (exist) {
      alert("This product is alleardy added in cart")
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is alleardy added in cart!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    else {
      setCart([...cart, { ...product, qty: 1 }])
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Added to cart successfully"
      });
      console.log("Jobayed kire" + product.Price)
    }
  }







  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true" // Initialize from localStorage
  );

  const toggleSignup = () => setShowSignup(!showSignup);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }

    if (!sessionStorage.getItem("hasVisited")) {
      sessionStorage.setItem("hasVisited", "true");
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    } else {
      setLoading(false);
    }
  }, []);


  const handleLoginSuccess = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };


  const handleAdminLogin = () => {
    setAdminLoggedIn(true);  // Set admin login to true
    localStorage.setItem("adminLoggedIn", "true"); // Store admin login state in localStorage
    // navigate("/admin", { replace: true }); 
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminLoggedIn(false); // Reset both user and admin login states
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("adminLoggedIn");
  };

  // Show loading screen on page refresh only
  if (loading) {
    return <Loading></Loading>
  }


  return (
    <>

      {/* {!loggedIn ? (
      
        showSignup ? (
          <Signup onToggleSignin={toggleSignup} />
        ) : (
          <Signin onLoginSuccess={handleLoginSuccess} onToggleSignup={toggleSignup} />
        )
      ) : (
        
        <>
        <BrowserRouter>
          <Nav onLogout={handleLogout}  search={search} setSearch={setSearch} searchproduct={searchproduct} />
          <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />
          <Routes>
           
            <Route path="/admin" element={<Admin />} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
        </>
      )} */}


      <BrowserRouter>
        {/* Conditionally render components based on login status */}
        {!loggedIn && !adminLoggedIn ? (
          showSignup ? (
            <Signup onToggleSignin={toggleSignup} />
          ) : (
            <Signin onLoginSuccess={handleLoginSuccess} onAdminLogin={handleAdminLogin} onToggleSignup={toggleSignup} />
          )
        ) : adminLoggedIn ? (  // Show Admin dashboard if admin is logged in
          <ProtectedRoute isAdmin={adminLoggedIn}>
            <Admin onLogout={handleLogout} />
            <Dashboard onLogout={handleLogout}></Dashboard>
           
          </ProtectedRoute>
        ) : (
          <>
            <Nav onLogout={handleLogout} search={search} setSearch={setSearch} searchproduct={searchproduct} />
            <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} />
            <Routes>
              <Route path="/" element={<Rout />} />

              {/* used for admin panel */}
              <Route path="admin" element={<Dashboard />}></Route>
              <Route path="navAdmin" element={<Navadmin  onLogout={handleLogout}/>}></Route>
             
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>


    </>
  )
}

export default App


