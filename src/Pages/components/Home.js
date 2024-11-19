import React, { useState, useEffect } from 'react';
import SwipeableCard from './Setting'; // Adjusted import path to match the card file
import Sidebar from '../common/Sidebar1';

const App = () => {
  const [cards, setCards] = useState([]); // Initial state to hold cards data
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner while data is being fetched
  const [error, setError] = useState(null); // Error state to handle errors

  // Fetch data from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=15'); // Adjust URL to your API
        // const response = await fetch('http://localhost:5000/api/cardData/getData/670e572bffbbf7b6e667361a'); // Adjust URL to your API
        const data = await response.json();
        setCards(data.results); // Assuming the API returns an array under the 'results' field
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchCards();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle swipe action
  const handleSwipe = (direction, index) => {
    if (direction === 'right') {
      console.log(`Card ${index + 1} swiped right!`);
    } else if (direction === 'left') {
      console.log(`Card ${index + 1} swiped left!`);
    }

    // Remove the swiped card from the list
    setCards(cards.filter((card, cardIndex) => cardIndex !== index));
  };

  if (loading) return <div>Loading...</div>; // Display loading state while data is being fetched
  if (error) return <div>{error}</div>; // Display error if API fetch fails

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300">
      <div>
        <Sidebar />
      </div>
      <div className="relative w-80 h-96">
        {cards.map((card, index) => (
          <SwipeableCard
            key={card.login.uuid} // Using the uuid to uniquely identify the cards
            content={{
              name: `${card.name.first} ${card.name.last}`,
              age: card.dob.age,
              bio: card.bio || 'No bio available.',
              image: card.picture.large,
            }}
            index={index}
            onSwipe={handleSwipe}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
