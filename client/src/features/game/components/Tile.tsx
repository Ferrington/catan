import HexCoordinate from "../HexCoordinate.ts";

export default function Tile({coords}: { coords: HexCoordinate }) {
  const HEXAGON_RATIO = 1.1547;

  const TILE_SIZE = 100;
  const TILE_WIDTH = TILE_SIZE;
  const TILE_GAP = 2;
  const TILE_HEIGHT = TILE_SIZE * HEXAGON_RATIO;
  const BOARD_WIDTH = 6 * TILE_SIZE * HEXAGON_RATIO;
  const BOARD_HEIGHT = 6 * TILE_SIZE;
  const ROW_OFFSET = 30;

  return (
    <div className="tile" style={{
      top: BOARD_HEIGHT / 2 - (((-coords.z) * (TILE_HEIGHT + TILE_GAP)) + TILE_HEIGHT / 2) - coords.z * ROW_OFFSET,
      left: BOARD_WIDTH / 2 - (((coords.x - coords.y) / 2 * (TILE_WIDTH + TILE_GAP)) + TILE_WIDTH / 2)
    }}>
      <div className="text">{coords.toString()}</div>
    </div>
  );
}