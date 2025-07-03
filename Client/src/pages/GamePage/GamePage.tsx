import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { GameStateStatus } from '@/types/game.type';
import { useNavigate } from 'react-router';
import { Board } from '@/components/Board/Board';
import { BoardControllers } from '@/components/BoardControllers/BoardControllers';
import { BoardInfo } from '@/components/BoardInfo/BoardInfo';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}));

export const GamePage = () => {
  const navigate = useNavigate();
  const { status } = useAppSelector(gameSliceSelectors.selectGame);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyle();

  useEffect(() => {
    if (status === GameStateStatus.IDLE) {
      navigate('/');
    }
    if (status !== GameStateStatus.IDLE) {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={classes.Container}>
      <BoardInfo />
      <Board />
      <BoardControllers />
    </div>
  );
};
