import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';

const SharedLayout = () => {
  return (
    <>
      <MainMenu />
      <Suspense fallback={<div>...Loading</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
