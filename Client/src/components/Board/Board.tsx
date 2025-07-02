import { Tile } from '../Tile/Tile';
import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { EmptyTile } from '../EmptyTile/EmptyTile';
import { Fragment } from 'react/jsx-runtime';

export const Board = () => {
  const { board } = useAppSelector(gameSliceSelectors.selectGame);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontSize: '30px',
        backgroundColor: '#27272a',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      {board.map((row, index) => (
        <div
          key={`row-${index}`}
          style={{
            display: 'flex',
            gap: '10px',
            fontSize: '30px',
          }}
        >
          {row.map((tile, index2) => (
            <Fragment key={tile.id}>
              {tile.value === 0 ? <EmptyTile /> : <Tile tile={tile} />}
            </Fragment>
            //
          ))}
        </div>
      ))}
    </div>
  );
};
