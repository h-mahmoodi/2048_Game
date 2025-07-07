import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { themeSelector } from '@/store/slices/app/app.selector';
import { setTheme } from '@/store/slices/app/app.slice';
import { Outlet } from 'react-router';

import { useLayoutStyle } from './Layout.style';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);

  const classes = useLayoutStyle();

  const switchThemeHandler = () => {
    console.log(theme);
    dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  };
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <Outlet />
      </div>
    </div>
  );
};
