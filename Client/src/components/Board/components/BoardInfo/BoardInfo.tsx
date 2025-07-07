import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSelector } from '@/store/slices/game/game.selector';
import { secondToTimer } from '@/utils/game.utils';
import { InfoCard } from '@/components/UI';

import { useBoardInfoStyle } from './BoardInfo.style';

export const BoardInfo = () => {
  const game = useAppSelector(gameSelector.game);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const classes = useBoardInfoStyle();

  useEffect(() => {
    if (game.status === 'playing') {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
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
