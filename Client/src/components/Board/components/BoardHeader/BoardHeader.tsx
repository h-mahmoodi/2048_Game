import { Button } from '@/components/UI';
import { BoardControllers } from './components';
import { Icon } from '@/types/app.type';

import { useBoardHeaderStyle } from './BoardHeader.style';
import { useTheme } from '@/hooks/useTheme/useTheme';

export const BoardHeader = () => {
  const { toggleTheme } = useTheme();
  const classes = useBoardHeaderStyle();
  return (
    <div className={classes.Container}>
      <div className={classes.Score}>
        <Button onClick={toggleTheme} icon={Icon.SUN} />
      </div>

      <div className={classes.Score}>
        <BoardControllers />
      </div>
    </div>
  );
};
