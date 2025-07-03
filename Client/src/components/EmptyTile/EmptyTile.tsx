import { type Tile as TileType } from '@/types/game.type';
import type { Theme } from '@/types/theme.type';
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles((theme: Theme) => ({
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

export const EmptyTile = () => {
  const classes = useStyle();
  return <div className={classes.Tile}></div>;
};
