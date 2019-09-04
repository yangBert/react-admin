import {lazy} from 'react';
const UserList = lazy(() => import('pages/user/UserList'));
const AppList = lazy(() => import('pages/app/AppList'));
const routes = [
  {
    path: "/pages/userList",
    component: UserList
  },
  {
    path: "/pages/appList",
    component: AppList
  }
];
export default routes;
