import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const AdminList = lazy(() => import('pages/admin/AdminList'));
const MenuList = lazy(() => import('pages/menu/MenuList'));
const RoleList = lazy(() => import('pages/role/RoleList'));
const UserList = lazy(() => import('pages/user/UserList'));
const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/system/adminList",
    component: AdminList
  },
  {
    path: "/system/menuList",
    component: MenuList
  },
  {
    path: "/system/roleList",
    component: RoleList
  },
  {
    path: "/platform/userList",
    component: UserList
  }
];
export default routes;
