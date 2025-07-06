import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useBoardControlleresStyle = createUseStyles(
  (_theme: Theme) => ({
    Container: {
      display: 'flex',
      gap: 10,
      justifyContent: 'space-between',
    },
  })
);
