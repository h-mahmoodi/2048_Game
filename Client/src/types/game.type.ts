import type { GameStateSchema, TileSchema } from '@/schemas/game.schema';
import { z } from 'zod';

export enum GameStateStatus {
  PLAYING = 'playing',
  PAUSE = 'pause',
  IDLE = 'idle',
  GAMEOVER = 'gameover',
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export type Tile = z.infer<typeof TileSchema>;

export type GameState = z.infer<typeof GameStateSchema>;
