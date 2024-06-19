export function drawHexagon(
  c: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  orientation: "pointy" | "flat",
  fillStyle: string,
  strokeStyle: string
) {
  const SIDES = 6;

  const rotation = orientation === "pointy" ? Math.PI / 2 : 0;

  c.beginPath();
  c.moveTo(
    center.x + radius * Math.cos(rotation),
    center.y + radius * Math.sin(rotation)
  );
  for (let s = 1; s < SIDES; s++) {
    c.lineTo(
      center.x + radius * Math.cos(rotation + (s * 2 * Math.PI) / SIDES),
      center.y + radius * Math.sin(rotation + (s * 2 * Math.PI) / SIDES)
    );
  }
  c.strokeStyle = strokeStyle;
  c.fillStyle = fillStyle;
  c.fill();
  c.closePath();
  c.stroke();
  c.strokeStyle = "black";
}
