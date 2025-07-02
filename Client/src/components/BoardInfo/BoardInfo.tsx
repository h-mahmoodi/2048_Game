import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { InfoCard } from '../ui/InfoCard/InfoCard';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));

export const BoardInfo = () => {
  const game = useAppSelector(gameSliceSelectors.selectGame);
  const classes = useStyle();
  return (
    <div className={classes.Container}>
      <InfoCard title="STATUS" value={game.status} />
      <div className={classes.Score}>
        <InfoCard title="SCORE" value={game.score} />
        <InfoCard title="BEST" value={game.bestScore} />
      </div>
    </div>
  );
};
