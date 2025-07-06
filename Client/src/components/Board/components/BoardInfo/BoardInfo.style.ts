import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useBoardInfoStyle = createUseStyles((_theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#27272a',
    padding: 20,
    borderRadius: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));
