import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";

import { FaCamera, FaEdit } from "react-icons/fa";
import Select from "react-select";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../Image/01.png";
import { Steps } from "antd";

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const ProfileInit = () => {
  const navigate = useNavigate(); // Create navigate function

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // Handle profile update logic here
    // After handling, navigate to the next page
    navigate("/profile2"); // Change '/next-page' to your desired path
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const dateOfBirth = watch("dateOfBirth");

  useEffect(() => {
    if (dateOfBirth) {
      const selectedDate = new Date(dateOfBirth);
      const maxDate = new Date("2005-12-31");
      if (selectedDate > maxDate) {
        // Optionally, set the value to an empty string or handle the error
        setValue("dateOfBirth", ""); // Clear the value if invalid
      }
    }
  }, [dateOfBirth, setValue]);

  const [current, setCurrent] = useState(0);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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

      <div className="bg-white md:w-1/2 shadow-lg rounded-lg w-full max-w-md sm:w-full lg:w-1/3 p-4 md:p-8 z-20 backdrop-blur-md bg-white/40 bg-opacity-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700">Profile</h1>
          <p className="text-md text-gray-900 underline underline-offset-1">
            Please update your details below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
        <Steps current={current} items={items} />
          <div className="flex justify-center mb-4 relative">
            <label htmlFor="profile-photo" className="cursor-pointer">
              <div className="relative w-24 h-24">
                <img
                  src={profilePhoto || "https://via.placeholder.com/1"}
                  className="w-full h-full rounded-full border-2 border-pink-200 object-cover"
                />
                {profilePhoto === null && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaCamera className="text-gray-500 text-2xl h-10 w-10" />
                  </div>
                )}
                <FaEdit className="absolute bottom-2 right-0 text-gray-500 w-5 h-5" />
              </div>
            </label>
            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <div className="mb-1 items-start">
            <label className="text-gray-700 mr-3 w-32 flex" htmlFor="firstname">
              First Name:
            </label>
            <input
              {...register("firstname", {
                required: "First Name is required.",
              })}
              id="firstname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.firstname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="First Name"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>
          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex" htmlFor="lastname">
              Last Name:
            </label>
            <input
              {...register("lastname", { required: "Last Name is required." })}
              id="lastname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.lastname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Last Name"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>

          {/* <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              {...register("dob", { required: "Date of Birth is required." })}
              id="dob"
              type="date"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.dob
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Date of Birth"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1 items-center">
        <label className="text-gray-700 mr-3 w-24 flex" htmlFor="dob">
          Date of Birth:
        </label>
        <input
          {...register("dob", {
            required: "Date of Birth is required.",
            validate: (value) => {
              // const age = calculateAge(value);
              // if (age < 18) {
              //   return "You must be at least 18 years old.";
              // }
              return true;
            }
          })}
          id="dob"
          type="date"
          className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
            errors.dob ? "border-red-500 focus:ring-red-300" : "focus:ring-pink-200"
          }`}
          placeholder="Date of Birth"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dob.message}
          </p>
        )}
      </div>

    </form>

          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">Age:</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required.",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old.",
                },
              })}
              id="age"
              min="18"
              // disabled
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.age
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>


       

         

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">
              Date of Birth:
            </label>
            <input
              type="date"
              {...register("birthday", {
                required: "Date of Birth is required.",
              })}
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.dateOfBirth
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
            />
            {errors.birthday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.birthday.message}
              </p>
            )}
          </div>

         


          <button
            type="submit"
            className="mt-4 w-28 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInit;
