import { GameStateStatus } from '@/types/game.type';
import { z } from 'zod';

export const TileSchema = z.object({
  id: z.string(),
  value: z.union([
    z.literal(0),
    z.literal(2),
    z.literal(4),
    z.literal(8),
    z.literal(16),
    z.literal(32),
    z.literal(64),
    z.literal(128),
    z.literal(256),
    z.literal(512),
    z.literal(1024),
    z.literal(2048),
  ]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  isMerged: z.boolean().optional(),
});

const GameStateStatusSchema = z.enum(
  Object.values(GameStateStatus) as [GameStateStatus, ...GameStateStatus[]]
);

export const GameStateSchema = z.object({
  board: z.array(z.array(TileSchema)),
  score: z.number(),
  bestScore: z.number(),
  size: z.number(),
  status: GameStateStatusSchema,
  timer: z.number(),
});
