// ...existing code...
const handleGameSelect = (e) => {
  const selectedId = e.target.value;
  setSelectedGameId(selectedId);
  if (selectedId) {
    const token = import.meta.env.VITE_API_TOKEN;
    const url = `https://slotslaunch.com/iframe/${selectedId}?token=${token}`;
    window.open(url, "_blank");
  }
};
// ...existing code...
<select
  onChange={handleGameSelect}
  className="mb-6 p-2 border rounded"
>
  {games.map((game) => (
    <option key={game.id} value={game.id}>
      {game.name}
    </option>
  ))}
</select>

// Remove or comment out this line, since the game will open in a new tab
// {selectedGameId && <GameEmbed gameId={selectedGameId} />}
// ...existing code...