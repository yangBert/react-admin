import {lazy} from 'react';
const UserList = lazy(() => import('pages/user/UserList'));
const AppList = lazy(() => import('pages/app/AppList'));
const Home = lazy(() => import('pages/home'));
const routes = [
  {
    path: "/user/userList",
    component: UserList
  },
  {
    path: "/app/appList",
    component: AppList
  },
  {
    path: "/home",
    component: Home
  }
];
export default routes;
