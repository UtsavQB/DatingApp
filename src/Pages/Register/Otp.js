import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(600);

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
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('Submitted OTP:', otpValue);
    await fetchData({ email:'check2@yopmail.com',otp: otpValue });  };

  const fetchData = async (formData) =>{
    try {
      const response = await fetch(
         `${process.env.REACT_APP_API_BASE_URL}/api/otp/verify`,
         {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData),
    
         }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, "Response Data");
    Navigate('/login')


    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white/50 p-8 bg-opacity-70 rounded-lg shadow-lg w-96 hover:scale-105 transition-transform transform z-10">
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
            <p className="text-gray-600">Time left: {timer}s</p>
          ) : (
            <p className="text-red-500">Time expired! Please request a new OTP.</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-300"
          disabled={timer <= 0}
        >
          Verify OTP
        </button>

        <p className="mt-4 text-center text-gray-600">
          Didn’t receive the OTP? <a href="#" className="text-pink-600 hover:underline">Resend OTP</a>
        </p>
      </form>
    </div>
  );
};

export default OTPVerification;
