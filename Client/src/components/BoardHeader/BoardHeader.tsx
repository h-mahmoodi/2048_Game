import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { InfoCard } from '../ui/InfoCard/InfoCard';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';
import { BoardControllers } from '../BoardControllers/BoardControllers';
import { Button } from '../ui/Button/Button';
import { Icon } from '@/types/app.type';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    padding: '0px 0px',
    borderRadius: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));

export const BoardHeader = () => {
  const game = useAppSelector(gameSliceSelectors.selectGame);
  const classes = useStyle();
  return (
    <div className={classes.Container}>
      <div className={classes.Score}>
        <Button onClick={() => {}} icon={Icon.SUN} />
      </div>

      <div className={classes.Score}>
        <BoardControllers />
      </div>
    </div>
  );
};
