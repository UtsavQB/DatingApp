import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "../Pages/Register/Otp";
import Index from "../Pages/Register/RegisterPage";
import Input from "../components/UIComponent/input";
import Login from "../Pages/Register/Login";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile/Profile";
import Phone from "../Pages/Register/Phone"
import Forgotpass from "../Pages/Register/Forgotpass";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />}></Route>
        <Route exact path="Otp" element={<OTPVerification />}></Route>
        <Route exact path="Input" element={<Input />}></Route>
        <Route exact path="Login" element={<Login />}></Route>
        <Route exact path="Home" element={<Home />}></Route>
        <Route exact path="profile" element={<Profile />}></Route>
        <Route exact path="phoneNumber" element={<Phone />}></Route>
        <Route exact path="Forgotpassword" element={<Forgotpass />}></Route>
        


      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
