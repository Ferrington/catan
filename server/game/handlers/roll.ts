export function onRoll() {
  const roll: Dice = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  console.log(roll);
  io.emit("roll", roll);
}
