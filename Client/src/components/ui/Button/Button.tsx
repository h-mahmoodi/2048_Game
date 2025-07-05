import type { Icon } from '@/types/app.type';
import type { Theme } from '@/types/theme.type';
import type { FC, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

type ButtonProps = {
  children?: ReactNode;
  onClick: () => void;
  icon?: Icon;
};

const useStyle = createUseStyles((theme: Theme) => ({
  Button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '20px 20px',
    borderRadius: 5,
    backgroundColor: '#3f3f46',
    color: 'white',
    outline: 0,
    border: 0,
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
}));

export const Button: FC<ButtonProps> = ({ children, onClick, icon }) => {
  const classes = useStyle();
  return (
    <button className={classes.Button} onClick={onClick}>
      {icon && <i className={icon} style={{ display: 'flex' }}></i>}
      {children && <span>{children}</span>}
    </button>
  );
};
