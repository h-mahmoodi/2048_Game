import type { Tile as TileType } from '@/types/game.type';
import { type FC } from 'react';
import { EmptyTile, FilledTile } from './components';

type TileProps = {
  tile: TileType;
};

export const Tile: FC<TileProps> = ({ tile }) => {
  if (tile.value === 0) {
    return <EmptyTile />;
  }
  return <FilledTile tile={tile} />;
};
