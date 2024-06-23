import { getTileSettlements } from "~~/lib/board/tiles/getTileSettlements";
import {
  addActionLogEntry,
  advanceTurn,
  gameState,
  getPlayerBySocketId,
  setTurnPhase,
} from "~~/server/game/state";
import { getEntries } from "~~/server/utils/getEntries";

export function onRoll(socketId: string) {
  const rollSum = rollDice(socketId);

  if (rollSum === 7) {
    // robber
    setTurnPhase({ main: "roll", sub: "robber" });
    console.log("robber");
  } else {
    distributeResources(rollSum);
  }
}

function rollDice(socketId: string) {
  const roll: Dice = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  const rollSum = roll[0] + roll[1];

  const player = getPlayerBySocketId(socketId);
  let text = `${player.name} rolled [${roll[0]}, ${roll[1]}]`;
  if (rollSum === 7) text += " - Robber!";
  addActionLogEntry({
    id: gameState.actionLog.length + 1,
    type: "roll",
    player: player.color,
    text,
    color: "background",
  });

  return roll[0] + roll[1];
}

function distributeResources(rollSum: number) {
  const settlements = Object.values(gameState.board.tiles)
    .filter((tile) => tile.numberToken === rollSum)
    .flatMap((tile) =>
      getTileSettlements(tile, gameState.board.settlements)
        .filter((settlement) => settlement && settlement.player != null)
        .map((settlement) => ({
          player: settlement.player,
          resource: tile.resource,
          isCity: settlement.isCity,
        }))
    );

  const resourcesToDistribute = settlements.reduce((acc, settlement) => {
    if (settlement.resource === "desert") return acc;
    const amount = settlement.isCity ? 2 : 1;
    const prev = acc[settlement.resource!] ?? 0;
    return {
      ...acc,
      [settlement.resource!]: amount + prev,
    };
  }, {} as Record<Resource, number>);

  const resourcesByPlayer = settlements.reduce((acc, settlement) => {
    if (settlement.player == null || settlement.resource === "desert")
      return acc;
    const amount = settlement.isCity ? 2 : 1;
    const prev = acc[settlement.player] ?? {};
    return {
      ...acc,
      [settlement.player]: {
        ...prev,
        [settlement.resource]: (prev[settlement.resource] ?? 0) + amount,
      },
    };
  }, {} as Record<PlayerColor, Record<Resource, number>>);

  for (const [resource, amount] of getEntries(resourcesToDistribute)) {
    if (amount > gameState.resources[resource]) {
      // not enough resources, check if only one player to receive
      const playerResources = settlements.filter(
        (s) => s.resource === resource
      );

      const playersWithResource = new Set(playerResources.map((s) => s.player));

      if (playersWithResource.size > 1) {
        continue;
      }

      for (const [playerColor, resources] of getEntries(resourcesByPlayer)) {
        const player = gameState.players.find(
          (player) => player.color === playerColor
        );
        if (!player) return;

        player[resource] += resources[resource] ?? 0;
        addActionLogEntry({
          id: gameState.actionLog.length + 1,
          type: "roll",
          player: player.color,
          text: `${player.name} received ${resources[resource]} ${resource}`,
          color: "text",
        });
      }
    } else {
      gameState.resources[resource] -= amount;

      for (const [playerColor, resources] of getEntries(resourcesByPlayer)) {
        const player = gameState.players.find(
          (player) => player.color === playerColor
        );
        if (!player || !resources[resource]) continue;

        player[resource] += resources[resource];
        addActionLogEntry({
          id: gameState.actionLog.length + 1,
          type: "roll",
          player: player.color,
          text: `${player.name} received ${resources[resource]} ${resource}`,
          color: "text",
        });
      }
    }
  }

  advanceTurn();
}
