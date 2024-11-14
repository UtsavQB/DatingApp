import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Sidebar from "../common/Sidebar1";

const SwipeCard = ({ users }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe logic with react-spring animation
  const [styles, set] = useSpring(() => ({
    x: 0,
    rotate: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const handleSwipe = (direction) => {
    if (direction === "right") {
      console.log("Liked:", users[currentIndex].name);
    } else {
      console.log("Disliked:", users[currentIndex].name);
    }
    
    // Increment index to show next card
    setCurrentIndex((prev) => (prev + 1) % users.length);
  };

  const handleDrag = (event) => {
    const touch = event.changedTouches ? event.changedTouches[0] : event;
    const offsetX = touch.cliel̥ntX;
    const offsetY = touch.clientY;
    const angle = offsetX < window.innerWidth / 2 ? -10 : 10;

    set({
      x: offsetX - window.innerWidth / 2,
      rotate: angle,
      scale: 1 - Math.abs(offsetX) / (window.innerWidth / 4),
    });
  };

  const handleDragEnd = () => {
    const { x } = styles;
    if (x < -200) {
      handleSwipe("left");
    } else if (x > 200) {
      handleSwipe("right");
    } else {
      set({ x: 0, rotate: 0, scale: 1 });
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div>
    <Sidebar />
    </div>
      {users.length > 0 && (
        <animated.div
          {...styles}
          className="absolute bg-white p-4 rounded-xl shadow-lg w-80 h-96"
          style={{ zIndex: 10 }}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onTouchMove={handleDrag}
          onTouchEnd={handleDragEnd}
        >
          <img
            src={users[currentIndex].img}
            alt={users[currentIndex].name}
            className="w-full h-3/4 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-semibold">{users[currentIndex].name}</h3>
          <p>{users[currentIndex].age} | {users[currentIndex].location}</p>
        </animated.div>
      )}

      <div className="absolute flex justify-between w-full px-10 bottom-10">
        <button
          className="bg-red-500 text-white p-3 rounded-full"
          onClick={() => handleSwipe("left")}
        >
          Dislike
        </button>
        <button
          className="bg-green-500 text-white p-3 rounded-full"
          onClick={() => handleSwipe("right")}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
