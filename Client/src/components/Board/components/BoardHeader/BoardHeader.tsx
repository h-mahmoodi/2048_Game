import { Button } from '@/components/ui';
import { BoardControllers } from './components';
import { Icon } from '@/types/app.type';

import { useBoardHeaderStyle } from './BoardHeader.style';

export const BoardHeader = () => {
  const classes = useBoardHeaderStyle();
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
