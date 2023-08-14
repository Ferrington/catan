export default function Chat({
  playerId,
  players,
}: {
  playerId: string;
  players: Players;
}) {
  return (
    <div>
      {Object.values(players).map((player: Player) => (
        <li key={player.id}>{player.name}</li>
      ))}
      <div style={{ marginTop: 50 }}>{players[playerId].name}</div>
      <div>{players[playerId].id}</div>
    </div>
  );
}
