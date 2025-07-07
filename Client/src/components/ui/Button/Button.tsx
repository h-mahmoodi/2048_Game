import { type FC, type ReactNode } from 'react';
import { type Icon } from '@/types/app.type';
import { useButtonStyle } from './Button.style';

type ButtonProps = {
  children?: ReactNode;
  onClick: () => void;
  icon?: Icon;
  active?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  active = false,
}) => {
  const classes = useButtonStyle({ active });
  return (
    <button className={classes.Button} onClick={onClick}>
      {icon && <i className={icon}></i>}
      {children && <span>{children}</span>}
    </button>
  );
};
