import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AdminList = lazy(() => import('pages/admin/AdminList'));
const MenuList = lazy(() => import('pages/menu/MenuList'));
const RoleList = lazy(() => import('pages/role/RoleList'));
const UserList = lazy(() => import('pages/user/UserList'));
const CertList = lazy(() => import('pages/cert/CertList'));
const AppList = lazy(() => import('pages/app/AppList'));
const AppAdd = lazy(() => import('pages/app/components/AppAdd'));
const DictTypeList = lazy(() => import('pages/dictType/DictTypeList'));
const DictDataList = lazy(() => import('pages/dictData'));
const AppDetail = lazy(() => import('pages/app/components/AppDetail'));
const OrgList = lazy(() => import('pages/org/OrgList'));


const routes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "*/500",
    component: ErrorResult
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
  },
  {
    path: "/cert/certList",
    component: CertList
  },
  {
    path: "/app/appList",
    component: AppList
  },
  {
    path: "/app/add",
    component: AppAdd
  },
  {
    path: "/app/detail",
    component: AppDetail
  },

  {
    path: "/dictType/dictTypeList",
    component: DictTypeList
  },
  {
    path: "/dictData/dictDataList",
    component: DictDataList
  },
  {
    path: "/org/orgList",
    component: OrgList
  }

];
export default routes;
