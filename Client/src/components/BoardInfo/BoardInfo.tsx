import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { InfoCard } from '../ui/InfoCard/InfoCard';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';
import { useEffect, useState } from 'react';
import { secondToTimer } from '@/utils/game.utils';
import { GameStateStatus } from '@/types/game.type';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#27272a',
    padding: 20,
    borderRadius: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));

export const BoardInfo = () => {
  const game = useAppSelector(gameSliceSelectors.selectGame);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const classes = useStyle();

  useEffect(() => {
    if (game.status === 'playing') {
      // فقط وقتی در حال بازی هست، تایمر فعال بشه
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    // if (
    //   game.status === GameStateStatus.PAUSE ||
    //   game.status === GameStateStatus.GAMEOVER ||
    //   game.status === GameStateStatus.IDLE
    // ) {
    //   setTimer(0);
    // }
  }, [game.status]);

  return (
    <div className={classes.Container}>
      <InfoCard title={game.status} value={secondToTimer(timer)} />
      <div className={classes.Score}>
        <InfoCard title="SCORE" value={game.score} />
        <InfoCard title="BEST" value={game.bestScore} />
      </div>
    </div>
  );
};
