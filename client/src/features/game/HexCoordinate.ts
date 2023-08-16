export default class HexCoordinate {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _z: number;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get z() {
    return this._z;
  }

  rightNeighbor() {
    return new HexCoordinate(this.x - 1, this.y + 1, this.z);
  }

  toString() {
    return `${this.x}, ${this.y}, ${this.z}`;
  }
}