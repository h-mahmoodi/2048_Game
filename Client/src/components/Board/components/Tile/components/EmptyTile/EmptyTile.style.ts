import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useEmptyTileStyle = createUseStyles((_theme: Theme) => ({
  Tile: {
    height: 120,
    width: 120,
    background: '#3f3f46',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    borderRadius: 10,
  },
}));
