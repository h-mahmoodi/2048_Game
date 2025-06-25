import type { Tile } from '@/types/game.type';

export const generateInitialTiles = (size: number, count: number) => {
  const tiles: Tile[] = [];

  while (tiles.length <= count) {
    const value = Math.random() < 0.8 ? 2 : 4; // 80%
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (
      tiles.some((tile) => tile.position.x === x && tile.position.y === y)
    ) {
      continue;
    }
    tiles.push({
      id: crypto.randomUUID(),
      value,
      position: { x, y },
      isMerged: false,
    });
  }
  return tiles;
};
