import { type FC } from 'react';
import { useInfoCardStyle } from './InfoCard.style';

type InfoCardProps = {
  title: string;
  value: number | string;
};

export const InfoCard: FC<InfoCardProps> = ({ title, value }) => {
  const classes = useInfoCardStyle();
  return (
    <div className={classes.Container}>
      <div className={classes.Title}>{title}</div>
      <div className={classes.Value}>{value}</div>
    </div>
  );
};
