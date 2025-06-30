import { type Tile as TileType } from '@/types/game.type';
import type { Theme } from '@/types/theme.type';
import type { FC } from 'react';
import { createUseStyles } from 'react-jss';

type TileProps = {
  tile: TileType;
};

const useStyle = createUseStyles((theme: Theme) => ({
  Tile: {
    height: 120,
    width: 120,
    background: ({ value }: TileType) => theme.tile[value].backGround,
    color: ({ value }: TileType) => theme.tile[value].color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    borderRadius: 4,
  },
}));

export const Tile: FC<TileProps> = ({ tile }) => {
  const classes = useStyle(tile);
  return <div className={classes.Tile}>{tile.value}</div>;
};
