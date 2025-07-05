import { Tile } from '../Tile/Tile';
import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { EmptyTile } from '../EmptyTile/EmptyTile';
import { Fragment } from 'react/jsx-runtime';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';
import { AnimatePresence } from 'motion/react';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,120px)',
    gridTemplateRows: 'repeat(4,120px)',
    gap: '10px',
    fontSize: '30px',
    backgroundColor: '#27272a',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
  },
}));

export const Board = () => {
  const { board } = useAppSelector(gameSliceSelectors.selectGame);
  const classes = useStyle();
  console.log(board);
  return (
    <div className={classes.Container}>
      {board
        .flat()
        .map((tile) =>
          tile.value === 0 ? (
            <EmptyTile key={tile.id} />
          ) : (
            <Tile key={tile.id} tile={tile} />
          )
        )}
    </div>
  );
};
