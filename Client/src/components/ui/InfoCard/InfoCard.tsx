import type { Theme } from '@/types/theme.type';
import type { FC } from 'react';
import { createUseStyles } from 'react-jss';

type InfoCardProps = {
  title: string;
  value: number | string;
};

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27272a',
    borderRadius: 5,
    height: 140,
    minWidth: 140,
    // padding: 10,
  },
  Title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Value: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    lineHeight: 1,
  },
}));

export const InfoCard: FC<InfoCardProps> = ({ title, value }) => {
  const classes = useStyle();
  return (
    <div className={classes.Container}>
      <div className={classes.Title}>{title}</div>
      <div className={classes.Value}>{value}</div>
    </div>
  );
};
