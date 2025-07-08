import { Outlet } from 'react-router';

import { useLayoutStyle } from './Layout.style';

export const Layout = () => {
  const classes = useLayoutStyle();

  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <Outlet />
      </div>
    </div>
  );
};
