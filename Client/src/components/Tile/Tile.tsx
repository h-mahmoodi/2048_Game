import { type Tile as TileType } from '@/types/game.type';
import type { Theme } from '@/types/theme.type';
import type { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { motion, type Transition } from 'motion/react';

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
    fontSize: 48,
    borderRadius: 5,
    gridColumn: ({ position }: TileType) => `${position.y + 1}`,
    gridRow: ({ position }: TileType) => `${position.x + 1}`,
  },
  // Tile: {
  //   position: 'absolute',
  //   height: 120,
  //   width: 120,
  //   background: ({ value }: TileType) => theme.tile[value].backGround,
  //   color: ({ value }: TileType) => theme.tile[value].color,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 48,
  //   borderRadius: 5,
  //   // استفاده از transform برای انیمیشن بهتر
  //   transform: ({ position }: TileType) =>
  //     `translate(${position.y * 130}px, ${position.x * 130}px)`, // 120px tile + 10px gap
  //   transition: 'transform 0.3s ease-in-out', // یا بگذار motion انجام بده
  // },
}));

const spring: Transition = {
  type: 'spring',
  damping: 45,
  stiffness: 500,
};

export const Tile: FC<TileProps> = ({ tile }) => {
  const classes = useStyle(tile);
  return (
    <motion.div
      layoutId={tile.id}
      layout
      className={classes.Tile}
      transition={spring}
    >
      {tile.value}
    </motion.div>
  );
};
