export enum GameStateStatus {
  PLAYING = 'playing',
  IDLE = 'idle',
  GAMEOVER = 'gameover',
}

export type Tile = {
  id: string;
  value: number;
  position: {
    x: number;
    y: number;
  };
  isMerged?: boolean;
};

export type GameState = {
  board: Tile[];
  score: number;
  bestScore: number;
  size: number;
  status: GameStateStatus;
};
