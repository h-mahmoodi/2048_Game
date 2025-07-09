import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useBoardInfoStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: () => theme.color.bgColor.secondary,
    padding: 20,
    borderRadius: 10,
  },
  Score: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
}));
