import React, { useState, useEffect } from "react";
// import { Snackbar  } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import couplesvg from "../../Assets/Icon/couple.svg";
import Landsvg from "../../Assets/Icon/Land.svg";
import Buildings from "../../Assets/Icon/Buidings.svg";
import Flower from "../../Assets/Icon/Flower.svg";
import Flower2 from "../../Assets/Icon/Flower2.svg";
import Flower3 from "../../Assets/Icon/Flower3.svg";
import Frame from "../../Assets/Icon/Frame.svg";


const OTPVerification = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
console.log(errors,"errors")
  const email = localStorage.getItem("Email");
  // const email = location.state?.email || ""; ` 
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]{0,1}$/)) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    const otpValue = otp.join("");
    console.log("Submitted OTP:", otpValue);
    
    await fetchData({ otp: otpValue });
  };

  const resentHandleSubmit = async () => {
    const otpValue = otp.join("");
    console.log("Submitted OTP:", otpValue);
    await resendData({ otp: otpValue });
  
  };

  const fetchData = async (formData) => {
    console.log("otp page data", email, formData);
    const finalData = {
      email: email,
      otp: formData.otp,
    };
    console.log("first", finalData);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/otp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "Response Data");
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resendData = async () => {
    console.log("otp page data", email);
    const finalData = {
      email: email,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/resend-otp/verifyResend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({email: email}),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "Response Data");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r bg-pink-100">
      <div className="hidden md:flex md:w-1/2 items-center justify-center w-full">

<span className="absolute left-0 bottom-0 z-10 flex items-center pl-0">
      <img src={Landsvg} alt="land" className="h-auto w-full" />
    </span>
    <span className="absolute left-0 bottom-7 z-0 flex items-center sm:bottom-6 md:bottom-5 lg:bottom-4 xl:bottom-3">
      <img src={Buildings} alt="buildings" className="h-auto w-full" />
    </span>
    <span className="absolute left-0 top-0 flex items-center">
      <img src={Flower} alt="flower" className="h-auto w-full" />
    </span>
    <span className="absolute right-0 top-0 flex items-center">
      <img src={Flower2} alt="flower2" className="h-auto w-full" />
    </span>
    <span className="absolute right-0 bottom-0 flex items-center">
      <img src={Flower3} alt="flower3" className="h-auto w-full" />
    </span>
    <span className="absolute top-20  flex item-center">
      <img src={Frame} alt="Frame" className="animate-bounce"/>
      
    </span>
    <span className="absolute left-4 md:left-12 lg:left-48 bottom-4 md:bottom-6 lg:bottom-10 z-20 flex items-center pl-2 sm:left-4 xl:left-48 sm:bottom-4 xl:bottom-10 sm:pl-3">
      <img
        src={couplesvg}
        alt="couple"
        className="h-auto md:h-96 lg:h-96 xl:h-[450px] 2xl:h-[600px] w-full"
      />
    </span>
    </div>
      
      <form onSubmit={handleSubmit} 
      className="bg-white/50 p-8 bg-opacity-70 rounded-lg shadow-lg w-96 hover:scale-105 transition-transform transform z-10"
      >
      
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Enter OTP</h2>

        <div className="flex justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="border rounded-lg w-12 h-12 mx-1 text-center text-lg focus:outline-none focus:ring focus:ring-blue-200"
              maxLength="1"
            />
          ))}
        </div>

        <div className="text-center mb-4">
          {timer > 0 ? (
            <p className="text-gray-600">Time left: {timer}</p>
          ) : (
            <p className="text-red-500">
              Time expired! Please request a new OTP.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-300"
          // disabled={timer <= 0}
        >
          Verify OTP
        </button>

        <p className="mt-4 text-center text-gray-600">
          Didn’t receive the OTP?
          {/* {timer > 0 ? (<a href="#" disabled="disabled" className="text-pink-600 hover:underline" onClick={resentHandleSubmit}>
            Resend OTP
          </a> ) : ( */}
            <a href="#" disabled={timer > 0} className="text-pink-600 hover:underline"  onClick={timer > 0 ? null : resentHandleSubmit}>
            Resend OTP
          </a> 
          {/* )} */}
        </p>
      </form>


    </div>
  
  );
};

export default OTPVerification;
