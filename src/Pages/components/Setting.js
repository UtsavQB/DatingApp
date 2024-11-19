import React, { useState, useEffect } from 'react';

const SwipeableCard = ({ content, index, onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isSwiped, setIsSwiped] = useState(false);

  // Handle mouse down (start drag)
  const handleMouseDown = (e) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    setDragging(true);
  };

  // Handle mouse move (during drag)
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setPosition({ x: dx, y: dy });
  };

  // Handle mouse up (end drag)
  const handleMouseUp = () => {
    setDragging(false);
    if (Math.abs(position.x) > 150) {
      const direction = position.x > 0 ? 'right' : 'left';
      setIsSwiped(true);
      onSwipe(direction, index);  // Notify parent to remove card
    } else {
      // Reset position if not swiped far enough
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (!dragging) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, position]);

  // CSS styling for the card, including swipe animation when card is swiped far enough
  const cardStyles = {
    transform: `translateX(${position.x}px) translateY(${position.y}px)`,
    opacity: isSwiped ? 0 : 1, // Fade out when swiped
    transition: isSwiped ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'none',
  };

  return (
    <div
      className="card w-full h-full bg-white rounded-xl shadow-none absolute cursor-pointer"
      style={cardStyles}
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-col items-center justify-center h-full p-4">
        <img 
          src={content.image} 
          alt={content.name} 
          className="w-48 h-48 rounded-full mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold">{content.name}</h2>
        <p className="text-gray-600">{content.age} years old</p>
        <p className="mt-2 text-center">{content.bio}</p>
      </div>
    </div>
  );
};

export default SwipeableCard;
