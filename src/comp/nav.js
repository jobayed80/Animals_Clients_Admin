import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiLogout, CiUser } from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import ani_1 from './image/ani-1.jpg'
import './nav.css'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


// logout firebase
import { getAuth, signOut } from "firebase/auth";
import {
  onAuthStateChanged
} from 'firebase/auth'
// user profile 
import { PlusOutlined } from '@ant-design/icons';
import { theme, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;





const Nav = ({ search, setSearch, searchproduct, onLogout }) => {


  const Swal = require('sweetalert2')
  let auth = getAuth();
  let [photo, setPhoto] = useState('')
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  // login verified check for google
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      // setPhoto(user.photoURL)
      // setName(user.displayName)
      // setEmail(user.email)

    })
  }, [])

  // logout
  let handleLogout = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
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
        title: "Logout Successfully"
      });
      onLogout()
    }).catch((error) => {
      // An error happened.
    });
  }
  // End of the firebase authentication





  //****** */ Start of the successful insert data with buffer image
  // get MaxId user_profile

  const [maxId, setMaxId] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8082/getUsersId')
      .then(response => {
        setMaxId(response.data.max_id);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ekhane ei variable gula database er moddhe jei column name chilo like same
  const username = localStorage.getItem('username');
  console.log(username)


  
  // useEffect(() => {
  //   checkUsername()
  // }, []);
  const [message, setMessage] = useState('');
  const [usernameStore, setusernameStore] = useState(username);
  const [Lname, setLname] = useState('');
  const [Fname, setFname] = useState('');
  const [Address, setAddress] = useState('');
  const [Contact, setContact] = useState('');
  const [AnimalsLover, setAnimalsLover] = useState('');
  const [Gender, setGender] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Biodata, setBiodata] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  // ekhane ei variable gula database er moddhe jei column name chilo like same
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Fname', Fname);
    formData.append('Lname', Lname);
    formData.append('Address', Address);
    formData.append('Contact', Contact);
    formData.append('AnimalsLover', AnimalsLover);
    formData.append('Gender', Gender);
    formData.append('Birthday', Birthday);
    formData.append('Biodata', Biodata);
    formData.append('usernameStore', usernameStore);

    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const response = await axios.post('http://localhost:8082/add-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      // Reset form fields
      setFname('');
      setLname('');
      setAddress('');
      setContact('');
      setAnimalsLover('');
      setGender('');
      setBirthday('');
      setBiodata('');
      setusernameStore('');
      setImage(null);

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
        title: "Inserted data in database"
      });
      window.location.reload(true);
    } catch (error) {
      console.error('There was an error!', error);
    }

  };

  
  const checkUsername = async () => {
    if (!usernameStore.trim()) {
      setMessage('Please enter a username');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/check-username', { usernameStore });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error checking username:', error);
      setMessage('Unable to check username at this time');
    }
  };


  // jokhnsignup kori tokhn username ta ke store kora hoi








  //**** */ used for profile form
  const [open, setOpen] = React.useState(false);
  const showDrawer = () => {
    setOpen(true);
    handleClose()
  };
  const onClose = () => {
    setOpen(false);
  };
  //** */  END used for profile form

  //**** */ used for dropdown profile photo button
  const [anchorEl, setAnchorEl] = useState(null);
  const Signinopen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  //*** END used for dropdown profile photo button


  return (
    <>
      <div className='header'>
        <div style={{ background: "#334155" }} className='last_header'>
          <div className='logo'>
            <img src='image/logo.webp' alt='logo'></img>
          </div>
          <div className='nav'>
            <ul>
              <li><Link to='/' className='link'>Home</Link></li>
              <li><Link to='/shop' className='link'>Shop</Link></li>
              <li><Link to='/cart' className='link'>Cart</Link></li>
              <li><Link to='/about' className='link'>About</Link></li>
              <li><Link to='/contact' className='link'>Contact</Link></li>
            </ul>
          </div>

          {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
          */}
          <div className='search_box'>
            <input type='text' value={search} placeholder='searh' onChange={(e) => setSearch(e.target.value)}></input>
            <button onClick={searchproduct}><AiOutlineSearch /></button>
          </div>
          <div class="flex items-center gap-1">
            <div>
              <Button
                id="basic-button"
                aria-controls={Signinopen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Signinopen ? 'true' : undefined}
                onClick={handleClick}
              >
                <div class="relative">
                  <img class="w-10 h-10 rounded-full" src={photo} >
                  </img>
                  <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Signinopen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={showDrawer} >Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

            </div>
            <div class="font-medium dark:text-white">
              <div>{name}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{email}</div>
            </div>
          </div>
        </div>
      </div>


      {/* used profile */}
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            {/* <Button className="border-2 border-green-400" onClick={onClose}>Cancel</Button> */}
          </Space>
        } >

        <div>
          <h2>Check Username</h2>
          <input
            type="text"
            value={usernameStore}
            onChange={(e) => setusernameStore(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={checkUsername}>Check</button>
          <p>{message}</p>
        </div>

        <form onSubmit={handleSubmit} >
          <label class=" flex  gap-5 mb-2 text-lg text-gray-900 dark:text-black font-medium"> Dear {name}, Your Id : <p style={{ color: "red", fontSize: "20px" }}>{maxId + 1}</p></label>
          <div class="grid gap-6 mb-6 mt-6 md:grid-cols-2">
            <label>username : </label>
            <input type="text" value={usernameStore} onChange={(e) => setusernameStore(e.target.value)}></input>
            <div>
              <label class="block mb-2 text-md text-gray-900 dark:text-black font-medium">Enter your first Name</label>
              <input type="text" value={Fname} onChange={(e) => setFname(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required ></input>
            </div>
            <div>
              <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Enter your last name</label>
              <input type="text" value={Lname} onChange={(e) => setLname(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required ></input>
            </div>
            <div>
              <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Enter your address</label>
              <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required ></input>
            </div>


            <div>
              <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Enter your contact</label>
              <input type="number" value={Contact} onChange={(e) => setContact(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact" required ></input>
            </div>
          </div>

          <div class="grid gap-6  md:grid-cols-2">
            <div>
              <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Do you prefer any animals?</label>
              <select name="AnimalsLover" value={AnimalsLover} onChange={(e) => setAnimalsLover(e.target.value)} required class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Select Gender</label>
              <select name="Gender" value={Gender} onChange={(e) => setGender(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div class="mb-6 mt-6">
            <label class="block mb-2 text-md font-medium text-gray-900 dark:text-black">Enter your Birthday</label>
            <input type="date" name="Birthday" value={Birthday} onChange={(e) => setBirthday(e.target.value)} class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required ></input>
          </div>

          <div class="mb-6">
            <label class="block text-md font-medium text-gray-900 dark:text-black">Enter your Bio data</label>
            <textarea value={Biodata} onChange={(e) => setBiodata(e.target.value)} required class="bg-white border h-12 border-gray-300 text-black text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" ></textarea >
          </div>


          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload file</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"></input>
          <p class="ml-1 mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

          <button type="submit" class="mt-5 text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>



        </form>

        {/* <h2>User Profile Form</h2>
        <form>
          <label>First Name:</label>
          <input type="text" name="Fname" value={formData.Fname} onChange={handleChange} />
          <br />
          <label>Last Name:</label>
          <input type="text" name="Lname" value={formData.Lname} onChange={handleChange} />
          <br />
          <label>Address:</label>
          <input type="text" name="Address" value={formData.Address} onChange={handleChange} />
          <br />
          <label>Contact:</label>
          <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} />
          <br />
          <label>Animals Lover:</label>
          <select name="AnimalsLover" value={formData.AnimalsLover} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <br />
          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <br />
          <label>Birthday:</label>
          <input type="date" name="Birthday" value={formData.Birthday} onChange={handleChange} />
          <br />
          <label>Biodata:</label>
          <textarea name="Biodata" value={formData.Biodata} onChange={handleChange}></textarea>
          <br />
          <label>Profile Image:</label>
          <input type="file" name="image" onChange={handleChange} />
          <br />
          {!isEditing ? (
            <button type="button" onClick={handleInsert}>Add Insert</button>
          ) : (
            <button type="button" onClick={handleUpdate}>Update Profile</button>
          )}
        </form> */}


      </Drawer>


    </>
  )
}

export default Nav
