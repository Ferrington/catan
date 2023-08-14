import { useState } from "react";
import { socket } from "../socket.ts";

export default function PlayerForm() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("blue");

  const handleCommit = () => {
    socket.connect();
    socket.emit("set player info", {
      name,
      color,
    });
  };

  return (
    <div>
      <label htmlFor="playerName">Player Name</label>
      <input
        style={{ marginLeft: 20 }}
        id="playerName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="red">Red</option>
        <option value="purple">Purple</option>
      </select>

      <button onClick={handleCommit}>Let's go!</button>
    </div>
  );
}
