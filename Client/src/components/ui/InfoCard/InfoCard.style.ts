import { type Theme } from '@/types/theme.type';
import { createUseStyles } from 'react-jss';

export const useInfoCardStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: () => theme.color.bgColor.tertiary,
    borderRadius: 10,
    height: 120,
    minWidth: 120,
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
