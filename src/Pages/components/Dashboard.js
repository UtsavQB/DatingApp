import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar1";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        const data = await response.json();
        setCards(data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Handle button actions (approve or reject)
  const handleAction = (action) => {
    if (action === "approve") {
      console.log(`Card ${currentIndex + 1} approved!`);
    } else if (action === "reject") {
      console.log(`Card ${currentIndex + 1} rejected!`);
    }

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("No more cards available.");
    }
  };

  if (error) return <div>{error}</div>;

  // If there are no cards left
  if (currentIndex >= cards.length) {
    return <div>No more cards available.</div>;
  }

  const currentCard = cards[currentIndex]; // Get the current card to display

  const profileDetails = currentCard.profileDetails || {
    bio: "No additional bio available.",
    hobbies: "Reading, Traveling, Coding",
    interests: "Tech, AI, Music",
    occupation: "Software Engineer",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="relative w-[550px] h-[650px] flex flex-col items-center justify-between space-y-4">
        {/* Card Container */}
        <div
          key={currentCard.login.uuid}
          className="w-full h-full bg-cover bg-center rounded-xl shadow-lg relative"
          style={{ backgroundImage: `url(${currentCard.picture.large})` }}
        >
          {/* Overlay for darkening the background */}
          <div className="absolute inset-0 bg-black opacity-10 rounded-xl"></div>

          <div className="absolute bottom-0 w-full bg-stone-500 bg-opacity-80 text-start py-3 pb-16 rounded-b-xl">
            <h2 className="text-2xl font-semibold text-gray-900 ml-3">{`${currentCard.name.first} ${currentCard.name.last}`}</h2>
            <p className="text-lg text-gray-800 ml-3">{`${
              currentCard.dob.age
            }, ${currentCard.bio || "No bio available."}`}</p>
          </div>

          {showDetails && (
            <div className="absolute bottom-0 w-full bg-stone-400 bg-opacity-100 text-center py-4 px-6 rounded-b-xl">
              <h3 className="text-xl font-semibold text-white">More Details</h3>
              <p className="text-md text-white">{`Hobbies: ${
                currentCard.hobbies || "No hobbies available"
              }`}</p>
              <p className="text-md text-white">{`Interests: ${
                currentCard.interests || "No interests available"
              }`}</p>
              <p className="text-md text-white">{`Occupation: ${
                currentCard.occupation || "No occupation available"
              }`}</p>
            </div>
          )}

          {/* <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 z-10">
            <button
              onClick={() => handleAction("reject")}
              className={`${setShowDetails == true ? "none" : "px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"}`} 
            >
              <ImCross />
            </button>

            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="px-2 py-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all transform hover:scale-110"
            >
              <MdOutlineKeyboardArrowDown className="h-7 w-7" />
            </button>

            <button
              onClick={() => handleAction("approve")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              <FaCheck />
            </button>
          </div> */}

          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 z-10">
            <button
              onClick={() => handleAction("reject")}
              className={`${
                showDetails
                  ? "hidden"
                  : "px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              }`}
            >
              <ImCross />
            </button>

            {/* Button to toggle more details */}
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="px-2 py-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all transform hover:scale-110"
            >
              <MdOutlineKeyboardArrowDown className="h-7 w-7" />
            </button>

            <button
              onClick={() => handleAction("approve")}
              className={`${
                showDetails
                  ? "hidden"
                  : "px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              }`}
            >
              <FaCheck />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
