import React, { useState } from "react";
import Sidebar from "../common/Sidebar1";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const initialUserData = {
    email: "admin@gmail.com",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (userData.newPassword !== userData.confirmNewPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    console.log("Profile updated:", userData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* User Information Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="first name"
              name="first name"
              value={userData.firstname}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
            <p className="text-sm text-blue-500 mt-2">
              For email updates, you need to contact the Operator.
            </p>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={userData.currentPassword}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={userData.newPassword}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={userData.confirmNewPassword}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
