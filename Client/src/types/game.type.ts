export enum GameStateStatus {
  PLAYING = 'playing',
  PAUSE = 'pause',
  IDLE = 'idle',
  GAMEOVER = 'gameover',
}

export type TilePosition = {
  x: number;
  y: number;
};

export type Tile = {
  id: string;
  value: 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;
  position: TilePosition;
  isMerged?: boolean;
};

//redux
export type GameState = {
  board: Tile[][];
  score: number;
  bestScore: number;
  size: number;
  status: GameStateStatus;
  timer: number;
};

//utils
export type updateBoardProps = {
  (currentBoard: Tile[][], tiles: Tile[]): Tile[][];
};

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}
