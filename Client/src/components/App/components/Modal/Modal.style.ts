import type { Theme } from '@/types/theme.type';
import { createUseStyles } from 'react-jss';

export const useModalStyle = createUseStyles((_theme: Theme) => ({
  Container: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  Backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // backdropFilter: 'blur(10px)',
  },
  Modal: {
    width: '50%',
    backgroundColor: 'white',
    zIndex: 11,
    borderRadius: 10,
    padding: 30,
  },
}));
