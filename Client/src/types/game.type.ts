export enum GameStateStatus {
  PLAYING = 'playing',
  IDLE = 'idle',
  GAMEOVER = 'gameover',
}

export type TilePosition = {
  x: number;
  y: number;
};

export type Tile = {
  id: string;
  value: number;
  position: TilePosition;
  isMerged?: boolean;
};

export type GameState = {
  board: Tile[];
  score: number;
  bestScore: number;
  size: number;
  status: GameStateStatus;
};
