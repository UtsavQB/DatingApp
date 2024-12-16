// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Location = () => {
//     const [message, setMessage] = useState("");
//     const [isVisible, setIsVisible] = useState(true);
//     const [latitude, setLatitude] = useState("");
//     const [longitude, setLongitude] = useState("");
//     const [address, setAddress] = useState("");
//     const navigate = useNavigate();

//     useEffect(
//         () => {
//             getLocation()
//         }, [])

//         useEffect(()=>{
//             getreverseCodingData()
//         },[latitude,longitude])

//         const getreverseCodingData =async ()=>{
//             try {
//                 const apiKey = "AIzaSyDOybjF1LzTROUEaQFUzQm8Wc9EzQ4KaCA";
//                 const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
//                 const res = await axios.get(url)
//                 console.log(res,"res")
//             } catch (error) {

//             }
//         }
//     const getLocation = async () => {
//         await navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 console.log("Location fetched:", position.coords);

//                 setLatitude(position.coords.latitude)
//                 setLongitude(position.coords.longitude)
//                 alert("Location access allowed.");
//                 setIsVisible(false);
//             },
//             (error) => {
//                 console.error("Error fetching location:", error);
//                 alert(
//                     "Unable to fetch location. Please enable it in your browser settings."
//                 );
//                 setIsVisible(false);
//             }
//         );
//     };

//     const handleBlock = () => {
//         alert("You chose to block location access.");
//         setIsVisible(false);
//     };

//     //   const handleAllow = () => {
//     //     getLocation(); // Trigger location request
//     //   };

//     if (!isVisible) return null;

//     return (
//         <div className="fixed justify-center inline-block bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-50">
//             <p className="flex items-center mb-3">
//                 <span className="mr-2">📍</span>
//                 This app requires your location. Please allow access.
//             </p>
//             <div className="flex space-x-2">
//                 {/* <button
//           onClick={handleBlock}
//           className="px-4 py-2 bg-gray-200 text-gray-800 rounded cursor-pointer"
//         >
//           Block
//         </button>
//         <button
//           onClick={handleAllow}
//           className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
//         >
//           Allow
//         </button> */}
//             </div>
//         </div>
//     );
// };

// export default Location;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../Image/01.png";
import LocationImage from "../../Image/location_icon.png";


const Location = () => {
    const navigate = useNavigate();
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [location, setLocation] = useState(null);
    const [state, setState] = React.useState({
        open: false
      });

    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationEnabled(true); 
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude }); 
                },
                (error) => {
                    console.error(error);
                    alert("Location access denied. Please allow location access to see nearby places.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    
    const onSubmit = (data) => {
       
        navigate("/profile");
    };

    
    
    

    useEffect(() => {
        
        const storedLocationStatus = localStorage.getItem("locationEnabled");
        if (storedLocationStatus === "true") {
            setLocationEnabled(true);
        }
    }, []);

   
    const saveLocationStatus = () => {
        localStorage.setItem("locationEnabled", locationEnabled.toString());
    };

    
    useEffect(() => {
        saveLocationStatus();
    }, [locationEnabled]);

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

            <div className="bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg rounded-lg w-full max-w-md h-[400px] p-8 flex flex-col items-center justify-between mx-auto space-y-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black">Location</h1>
                </div>

                <div className="flex flex-col items-center space-y-10 mb-0">
                    <img src={LocationImage} alt="Location Icon" className="w-24 h-auto" />
                    <h1 className="text-center text-md font-medium text-black">
                        {locationEnabled ? (
                            <>
                                You have enabled your location! We can now show you a list of places nearby.
                                <br />
                                Latitude: {location.latitude}, Longitude: {location.longitude}
                            </>
                        ) : (
                            "You have turned off your location. To see a list of people near you, allow us to access your location while you use the app."
                        )}
                    </h1>
                </div>

                <div className="w-full flex justify-center items-center">
                    <button
                        className="bg-pink-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        onClick={requestLocation} 
                    >
                        {locationEnabled ? "Location Enabled" : "Turn On Location"}
                    </button>
                </div>
            </div>
        
        
      </div>
    );
};

export default Location;

