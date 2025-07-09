import { Outlet } from 'react-router';

import { useLayoutStyle } from './Layout.style';
import { Modal } from '../Modal/Modat';

export const Layout = () => {
  const classes = useLayoutStyle();

  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <Outlet />
      </div>
      <Modal isOpen />
    </div>
  );
};
