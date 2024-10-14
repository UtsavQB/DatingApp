import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OTPVerification from "../Pages/Register/Otp";
import Index from "../Pages/Register/RegisterPage";
import Input from "../components/UIComponent/input";
import LoginPage from "../Pages/Register/Login";
import New from "../Pages/Register/New";
import Home from "../Pages/Home";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />}></Route>
        <Route exact path="Otp" element={<OTPVerification />}></Route>
        <Route exact path="Input" element={<Input />}></Route>
        <Route exact path="Login" element={<LoginPage />}></Route>
        <Route exact path="new" element={<New />}></Route>
        <Route exact path="Home" element={<Home />}></Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
