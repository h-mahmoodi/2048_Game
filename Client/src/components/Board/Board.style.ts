import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useBoardStyles = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,120px)',
    gridTemplateRows: 'repeat(4,120px)',
    gap: '10px',
    fontSize: '30px',
    backgroundColor: () => theme.color.bgColor.secondary,
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
  },
}));
