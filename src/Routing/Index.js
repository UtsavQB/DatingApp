import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "../Pages/Register/Otp";
import Index from "../Pages/Register/RegisterPage";
import Input from "../components/UIComponent/input";
import Login from "../Pages/Register/Login";
import Home from "../Pages/components/Home";
import Profile from "../Pages/Profile/Profile";
import Forgotpass from "../Pages/Register/Forgotpass";
import Profile2 from "../Pages/Profile/Profile2"
import Sidebar from "../Pages/Register/Sidebar"
import Sidebar1 from "../Pages/common/Sidebar1"
import SocialAuth from "../Pages/Register/GoogleLogin";
import Location from "../Pages/Register/location";
import ConfirmEmail from "../Pages/Register/ConfirmEmail"


const Routing = () => {
  const users = [
    { name: "Alice", age: 25, location: "New York", img: "/images/alice.jpg" },
    { name: "Milly", age: 30, location: "California", img: "/images/milly.jpg" },
    { name: "Kamini", age: 29, location: "Los Angeles", img: "/images/kamini.jpg" },
    { name: "Diana", age: 23, location: "London", img: "/images/diana.jpg" },
    { name: "Lucy", age: 21, location: "Peris", img: "/images/lucy.jpg" },
    { name: "Alexendra", age: 24, location: "Czech Republic", img: "/images/alexendra.jpg" },
    { name: "Emma", age: 27, location: "United Kingdom", img: "/images/emma.jpg" },
    { name: "Sydney", age: 26, location: "London", img: "/images/sydney.jpg" },
    { name: "Sadie", age: 22, location: "Las Vegas", img: "/images/sadie.jpg" },
    { name: "Elizabeth", age: 28, location: "United Kingdom", img: "/images/elizabeth.jpg" },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />}></Route>
        <Route exact path="Otp" element={<OTPVerification />}></Route>
        <Route exact path="Input" element={<Input />}></Route>
        <Route exact path="Login" element={<Login />}></Route>
        <Route exact path="Home" element={<Home users={users}/>}></Route>
        <Route exact path="dashboard" element={<Dashboard users={users}/>}></Route>
        <Route exact path="profileInit" element={<ProfileInit />}></Route>
        <Route exact path="profile" element={<Profile />}></Route>
        <Route exact path='/reset-password/:token' element={<Forgotpass />}></Route>
        <Route exact path="Forgotpassword" element={<Forgotpass />}></Route>
        <Route exact path="profile2" element={<Profile2 />}></Route>
        <Route exact path="sidebar" element={<Sidebar />}></Route>
        <Route exact path="sidebar1" element={<Sidebar1 />}></Route>
        <Route exact path="SocialAuth" element={<SocialAuth />}></Route>
        <Route exact path="Location" element={<Location />}></Route>   

        
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

