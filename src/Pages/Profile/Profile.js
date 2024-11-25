import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

import { FaCamera, FaEdit } from "react-icons/fa";
import Select from "react-select";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image from "../../Image/01.png";

const ProfilePage = () => {
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

  const onSubmit = async (data) => {
    console.log(data);
    await fetchData(data);
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

  const getid = localStorage.getItem("id");
  // console.log(getid,'getid')

  const fetchData = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/userProfile/profile/update/${getid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "Response Data");
       navigate('');
    } catch (error) {}
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
               {...register("userImage", {
                required: "Image is required.",
              })}
              type="file"
              id="profile-photo"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
               {errors.userImage && (
              <p className="text-red-500 text-sm absolute top-24">
                {errors.userImage.message}
              </p>
            )}
          </div>

        

          <div className="mb-1 items-start">
            <label className="text-gray-700 mr-3 w-32 flex" htmlFor="userFirstName">
              First Name:
            </label>
            <input
              {...register("userFirstName", {
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
            {errors.userFirstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userFirstName.message}
              </p>
            )}
          </div>
          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex" htmlFor="lastname">
              Last Name:
            </label>
            <input
              {...register("userLastName", {
                required: "Last Name is required.",
              })}
              id="lastname"
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.lastname
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
              placeholder="Last Name"
            />
            {errors.userLastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userLastName.message}
              </p>
            )}
          </div>

          <div className="mb-1 items-center">
            <label className="text-gray-700 mr-3 w-24 flex">
              Date of Birth:
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required.",
              })}
              max="2100-12-31" // Set a far future max date for visual purposes
              className={`border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.dateOfBirth
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-pink-200"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

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

          {/* <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">Gender:</label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("gender", option?.value)}
              className={`w-full ${errors.gender ? "border-red-500" : ""}`}
              placeholder="Select Gender"
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div> */}

          {/* <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">
              Interested Gender:
            </label>
            <Select
              options={genderOptions}
              onChange={(option) => setValue("interestedGender", option?.value)}
              className={`w-full ${
                errors.interestedGender ? "border-red-500" : ""
              }`}
              placeholder="Select Interested Gender"
            />

            {errors.interestedGender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.interestedGender.message}
              </p>
            )}
          </div> */}


          {/* <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-3 w-24">Hobbies:</label>
           
            <Select
              options={hobbiesOptions}
              isMulti
              onChange={(options) =>
                setValue(
                  "hobbies",
                  options.map((option) => option.value)
                )
              }
              className={`w-full ${errors.hobbies ? "border-red-500" : ""}`}
              placeholder="Select or create hobbies"
            />

            {errors.hobbies && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hobbies.message}
              </p>
            )}
          </div> */}

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

export default ProfilePage;
