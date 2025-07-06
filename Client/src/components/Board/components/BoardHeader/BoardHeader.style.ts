import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useBoardHeaderStyle = createUseStyles((_theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    padding: '0px 0px',
    borderRadius: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));
