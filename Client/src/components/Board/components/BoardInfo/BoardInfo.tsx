import { useEffect, useState } from 'react';
import { useGameEngine } from '@/hooks';
import { secondToTimer } from '@/utils/game.utils';
import { InfoCard } from '@/components/UI';
import { useModal } from '@/hooks/useModal/useModal';

import { useBoardInfoStyle } from './BoardInfo.style';

export const BoardInfo = () => {
  const { openModal } = useModal();
  const {
    state: { status, score, bestScore },
  } = useGameEngine();
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );
  const classes = useBoardInfoStyle();

  useEffect(() => {
    if (status === 'playing') {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
  }, [status]);

  return (
    <div className={classes.Container}>
      <InfoCard title={status} value={secondToTimer(timer)} />
      <div className={classes.Score} onClick={() => openModal('salam')}>
        <InfoCard title="SCORE" value={score} />
        <InfoCard title="BEST" value={bestScore} />
      </div>
    </div>
  );
};
