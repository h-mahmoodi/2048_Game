import type { Theme } from '@/types/theme.type';
import type { FC, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

const useStyle = createUseStyles((theme: Theme) => ({
  Button: {
    padding: '15px 30px',
    borderRadius: 5,
    backgroundColor: '#27272a',
    color: 'white',
    outline: 0,
    border: 0,
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
}));

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const classes = useStyle();
  return (
    <button className={classes.Button} onClick={onClick}>
      {children}
    </button>
  );
};
