import { type FC } from 'react';
import { motion, type Transition } from 'motion/react';
import { type Tile } from '@/types/game.type';

import { useFilledTileStyle } from './FilledTile.style';

type FilledTileProps = {
  tile: Tile;
};

const spring: Transition = {
  type: 'spring',
  damping: 45,
  stiffness: 500,
};

export const FilledTile: FC<FilledTileProps> = ({ tile }) => {
  const classes = useFilledTileStyle(tile);
  return (
    <motion.div
      layoutId={tile.id}
      layout
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={spring}
      className={classes.Tile}
    >
      {tile.value}
    </motion.div>
  );
};
