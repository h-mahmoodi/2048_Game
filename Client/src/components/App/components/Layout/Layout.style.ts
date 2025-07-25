import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

export const useLayoutStyle = createUseStyles((theme: Theme) => ({
  Main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: () => theme.color.bgColor.primary,
    // backgroundColor: '#19191e',
  },
  Container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
