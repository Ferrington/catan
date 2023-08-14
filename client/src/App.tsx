import {useEffect, useState} from "react";
import {socket} from "./socket.ts";
import Chat from "./features/chat/Chat.tsx";
import PlayerForm from "./components/PlayerForm.tsx";

// const colors = ["blue", "green", "red", "purple"];

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [players, setPlayers] = useState<Players>({});
  const [playerId, setPlayerId] = useState("");

  console.log(players);
  console.log(playerId);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function updatePlayerList(players: Players) {
      setPlayers(players);
    }

    function removePlayer(playerId: string) {
      setPlayers((prevData) => {
        const newData = { ...prevData };
        delete newData[playerId];
        return newData;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("update player list", updatePlayerList);
    socket.on("set player id", setPlayerId);
    socket.on("remove player", removePlayer);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update player list", updatePlayerList);
      socket.off("set player id", setPlayerId);
      socket.off("remove player", removePlayer);
    };
  }, []);

  return isConnected ? (
    <Chat playerId={playerId} players={players} />
  ) : (
    <PlayerForm />
  );
}
