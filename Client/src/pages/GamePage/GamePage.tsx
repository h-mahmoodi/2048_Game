import { useEffect, useState } from 'react';
import { useGameEngine } from '@/hooks';
import { GameStateStatus } from '@/types/game.type';
import { useNavigate } from 'react-router';
import { Board } from '@/components/Board/Board';
import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';
import { BoardHeader, BoardInfo } from '@/components/Board/components';

const useStyle = createUseStyles((_theme: Theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}));

export const GamePage = () => {
  const navigate = useNavigate();
  const {
    state: { status },
  } = useGameEngine();
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
      <BoardHeader />
      <BoardInfo />
      <Board />
    </div>
  );
};
