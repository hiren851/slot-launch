import React, { useEffect, useState } from "react";
import GameEmbed from "../components/GameEmbed";

const Home = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = import.meta.env.VITE_API_TOKEN;
  const origin = import.meta.env.VITE_API_ORIGIN;

  
  useEffect(() => {
    fetch(`${apiUrl}?token=${token}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setGames(data.data);
          setSelectedGameId(data.data[0].id);
        } else {
          console.warn("No game data found", data);
          setGames([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching games", err);
        setGames([]);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Choose a Game</h1>
      <select
        onChange={(e) => setSelectedGameId(e.target.value)}
        className="mb-6 p-2 border rounded"
      >
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      {selectedGameId && <GameEmbed gameId={selectedGameId} />}
    </div>
  );
};

export default Home;
