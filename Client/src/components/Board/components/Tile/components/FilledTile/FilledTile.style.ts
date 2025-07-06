import { createUseStyles } from 'react-jss';
import type { Tile } from '@/types/game.type';
import type { Theme } from '@/types/theme.type';

export const useFilledTileStyle = createUseStyles((theme: Theme) => ({
  Tile: {
    height: 120,
    width: 120,
    background: (tile: Tile) => theme.tile[tile.value].backGround,
    color: (tile: Tile) => theme.tile[tile.value].color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 48,
    borderRadius: 10,
    gridColumn: (tile: Tile) => `${tile.position.y + 1}`,
    gridRow: (tile: Tile) => `${tile.position.x + 1}`,
  },
}));
