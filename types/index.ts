export {};

declare global {
  type ServerGameState = {
    players: VisiblePlayer[];
    socketAssignments: string[];
    board: CatanBoard;
    turn: number;
    turnPhase: TurnPhase;
    actionLog: Action[];
    resources: Record<Resource, number>;
  };

  type ClientGameState = {
    players: Player[];
    board: CatanBoard;
    turn: number;
    turnPhase: TurnPhase;
    actionLog: Action[];
  };

  type TurnPhase = "Roll" | "Trade" | "Build";

  type PlayerColor = "red" | "blue" | "green" | "purple";

  type Dice = [Die, Die];

  type Die = 1 | 2 | 3 | 4 | 5 | 6;

  type Player = VisiblePlayer | HiddenPlayer;

  type HiddenPlayer = {
    visibleResources: false;
    name: string;
    color: PlayerColor;
    settlements: number; // 5 start
    cities: number; // 4 start
    roads: number; // 15 start
    victoryPoints: number;
  };

  type VisiblePlayer = Omit<HiddenPlayer, "visibleResources"> & {
    visibleResources: true;
    wool: number;
    brick: number;
    lumber: number;
    grain: number;
    ore: number;
  };

  type Action = {
    type: string;
    player: PlayerColor;
    text: string;
  };

  type CatanBoard = {
    tiles: Record<string, HexTile>;
    roads: Record<string, Road>;
    settlements: Record<string, Settlement>;
    robberLocation: HexPoint;
  };

  type HexTile = {
    isHighlighted: boolean;
    coords: HexPoint;
    resource: TileType;
    numberToken: number | null;
    harbors: Partial<Record<VertexDirection, Harbor>>;
  };

  type Resource = "wool" | "brick" | "lumber" | "grain" | "ore";

  type TileType = Resource | "desert";

  type Road = {
    rotation: number;
    coords: HexPoint;
    player: PlayerColor | null;
  };

  type Settlement = {
    isCity: boolean;
    player: PlayerColor | null;
    coords: HexPoint;
    harbor: Harbor | null;
  };

  type Harbor = {
    resource: TileType | null;
    ratio: number;
    vertex: VertexDirection;
  };

  type TemplateHarbor = {
    resource: TileType | null;
    ratio: number;
    vertices: VertexDirection[];
  };

  type VertexDirection =
    | "TOP_RIGHT"
    | "TOP"
    | "TOP_LEFT"
    | "BOTTOM_LEFT"
    | "BOTTOM"
    | "BOTTOM_RIGHT";

  type HexPoint = {
    q: number;
    r: number;
    s: number;
  };

  type Point = {
    x: number;
    y: number;
  };

  type BeginnerBoard = {
    tiles: Record<string, BeginnerTileInfo>;
    roads: Record<string, BeginnerRoadInfo>;
    settlements: Record<string, BeginnerSettlementInfo>;
  };

  type BeginnerTileInfo = {
    resource: HexTile["resource"];
    numberToken: HexTile["numberToken"];
  };

  type BeginnerRoadInfo = {
    player: PlayerColor;
  };

  type BeginnerSettlementInfo = {
    player: PlayerColor;
  };
}
