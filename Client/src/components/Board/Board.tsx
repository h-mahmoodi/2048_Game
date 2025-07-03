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
    // display: 'flex',
    display: 'grid',
    gridTemplateColumns: 'repeat(4,120px)',
    gridTemplateRows: 'repeat(4,120px)',
    // flexDirection: 'column',
    gap: '10px',
    fontSize: '30px',
    backgroundColor: '#27272a',
    padding: '20px',
    borderRadius: '5px',
    position: 'relative',
  },
  //   Container: {
  //     position: 'relative',
  //     width: 4 * 130, // 4 tile * (120 + 10 gap)
  //     height: 4 * 130,
  //     backgroundColor: '#27272a',
  //     padding: '20px',
  //     borderRadius: '5px',
  //   },
}));

export const Board = () => {
  const { board } = useAppSelector(gameSliceSelectors.selectGame);
  const classes = useStyle();
  console.log(board);
  return (
    <div className={classes.Container}>
      {board.flat().map(
        (tile) =>
          tile.value === 0 ? (
            <EmptyTile key={tile.id} />
          ) : (
            <Tile key={tile.id} tile={tile} />
          )
        // <AnimatePresence>
        // <Fragment
        //   key={`${tile.position.x}-${tile.position.y}-${tile.value}`}
        // >
        //   {tile.value === 0 ? <EmptyTile /> : <Tile tile={tile} />}
        // </Fragment>
        // tile.value === 0 ? null : <Tile key={tile.id} tile={tile} />
        //</AnimatePresence>
      )}
    </div>
  );
};

{
  /* {board.map((row, index) => (
        <div
        key={`row-${index}`}
        style={{
            display: 'flex',
            gap: '10px',
            fontSize: '30px',
            position: 'relative',
            }}
            >
            {row.map((tile, index2) => (
                <Fragment key={tile.id}>
                {tile.value === 0 ? <EmptyTile /> : <Tile tile={tile} />}
                </Fragment>
                //
                ))}
                </div>
                ))} */
}
