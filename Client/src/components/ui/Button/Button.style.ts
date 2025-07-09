import { createUseStyles } from 'react-jss';
import { type Theme } from '@/types/theme.type';

type StyleProps = {
  active: boolean;
};

export const useButtonStyle = createUseStyles<any, StyleProps, Theme>(
  (_theme) => ({
    Button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '20px 20px',
      borderRadius: 10,
      backgroundColor: ({ active }) => (active ? '#3b82f6' : '#27272a'),
      color: 'white',
      outline: 0,
      border: 0,
      fontSize: 20,
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: ({ active }) => (active ? '#3b82f6' : '#3f3f46'),
      },

      '& i': {
        display: 'flex',
      },
    },
  })
);
