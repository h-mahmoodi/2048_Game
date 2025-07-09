import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useEmptyTileStyle = createUseStyles((theme: Theme) => ({
  Tile: {
    height: 120,
    width: 120,
    backgroundColor: () => theme.color.tile[0].bgColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    borderRadius: 10,
  },
}));
