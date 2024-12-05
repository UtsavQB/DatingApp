import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../Image/01.png";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const hobbiesOptions = [
  { value: "reading", label: "Reading" },
  { value: "traveling", label: "Traveling" },
  { value: "gaming", label: "Gaming" },
];

const ProfilePages = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    setIsBlurred(true); // Set blur effect
    requestLocation();
  };

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else { 
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }
  
  // function showPosition(position) {
  //   x.innerHTML = "Latitude: " + position.coords.latitude + 
  //   "<br>Longitude: " + position.coords.longitude;
  // }

  // const requestLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Location:", position);
  //         navigate("/sidebar1"); // Navigate to home page
  //       },
  //       (error) => {
  //         console.error("Error obtaining location:", error);
  //         setIsBlurred(false); // Remove blur if location access is denied
  //         alert("Location access denied. Please enable it in your browser settings.");
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     setIsBlurred(false); // Remove blur if geolocation is not supported
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location:", position);
          // Navigate to sidebar1 page
          navigate("/sidebar1"); 
        },
        (error) => {
          console.error("Error obtaining location:", error);
          setIsBlurred(false); // Remove blur if location access is denied
          alert("Location access denied. Please enable it in your browser settings.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsBlurred(false); // Remove blur if geolocation is not supported
      alert("Geolocation is not supported by this browser.");
    }
  };
  

  return (
    <div className={`min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${isBlurred ? 'backdrop-blur-sm' : ''}`}>
      <div className="hidden md:flex md:w-3/5 w-3/5 items-center justify-center h-3/5">
        <div className="container h-screen">
          <div className="p-4">
            <img
              src={image}
              className="w-4/6 h-4/6 object-cover rounded-lg mt-14 animate-slow-bounce"
            />
          </div>
        </div>
      </div>

      <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md sm:w-full backdrop-blur-md bg-white/40 bg-opacity-10 lg:w-1/3 p-4 md:p-8 z-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700">Profile</h1>
          <p className="text-md text-gray-500">Please update your details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("gender", option)}
              className={`w-full backdrop-blur-md bg-white/40 bg-opacity-10 z-20${errors.gender ? " border-red-500" : ""}`}
              placeholder="Select Gender"
            />
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-full flex">Interested Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("interestedGender", option)}
              className={`w-full backdrop-blur-md bg-white/40 bg-opacity-10 z-10${errors.interestedGender ? " border-red-500" : ""}`}
              placeholder="Select Interested Gender"
            />
            {errors.interestedGender && <p className="text-red-500 text-sm mt-1">{errors.interestedGender.message}</p>}
          </div>

          <div className="mb-4 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Hobbies:</label>
            <Select
              options={hobbiesOptions}
              isMulti
              onChange={(options) => setValue("hobbies", options)}
              className={`w-full ${errors.hobbies ? "border-red-500" : ""}`}
              placeholder="Select or create hobbies"
            />
            {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Want to go back?{" "}
            <Link to="/profile" className="text-pink-600 hover:underline">Cancel</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePages;
