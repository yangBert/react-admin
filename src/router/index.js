import {lazy} from 'react';
const Home = lazy(() => import('pages/home'));
const UserList = lazy(() => import('pages/user/UserList'));
const MenuList = lazy(() => import('pages/menu/MenuList'));
const RoleList = lazy(() => import('pages/role/RoleList'));
const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/system/userList",
    component: UserList
  },
  {
    path: "/system/menuList",
    component: MenuList
  },
  {
    path: "/role/roleList",
    component: RoleList
  }
];
export default routes;
