window.onload = () => {
  const rows = [
    { size: 3, start: new TileCoordinate(2, 0, -2) },
    { size: 4, start: new TileCoordinate(2, -1, -1) },
    { size: 5, start: new TileCoordinate(2, -2, 0) },
    { size: 4, start: new TileCoordinate(1, -2, 1) },
    { size: 3, start: new TileCoordinate(0, -2, 2) },
  ];
  for (const row in rows) {
    addRow(rows[row]);
  }

  console.log(JSON.stringify(rows));
};

function addRow(row) {
  let html = [];
  let coords = row.start;
  for (let i = 0; i < row.size; i++) {
    let classes = "hex";

    html.push(
      `<div class='${classes}'><div class='text'>${coords.toString()}</div></div>`
    );

    coords = coords.rightNeighbor();
  }

  const div = document.createElement("div");
  div.classList.add("hex-row");
  div.innerHTML = html.join("");

  document.getElementById("board").append(div);
}

class TileCoordinate {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  rightNeighbor() {
    return new TileCoordinate(this.x - 1, this.y + 1, this.z);
  }

  toString() {
    return `${this.x}, ${this.y}, ${this.z}`;
  }
}
