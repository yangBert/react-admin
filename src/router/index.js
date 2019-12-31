import { lazy } from 'react';
const Home = lazy(() => import('pages/menu/MenuList'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AdminList = lazy(() => import('pages/admin/AdminList'));
const MenuList = lazy(() => import('pages/menu/MenuList'));
const RoleList = lazy(() => import('pages/role/RoleList'));
const UserList = lazy(() => import('pages/user/UserList'));
const CertList = lazy(() => import('pages/cert/CertList'));
const CertDetail = lazy(() => import('pages/cert/components/CertDetail'));
const AppList = lazy(() => import('pages/app/AppList'));
const AppAdd = lazy(() => import('pages/app/components/AppAdd'));
const AppAuthList = lazy(() => import('pages/app/components/AppAuthList'));
const AppDetail = lazy(() => import('pages/app/components/AppDetail'));
const DictTypeList = lazy(() => import('pages/dictType/DictTypeList'));
const DictDataList = lazy(() => import('pages/dictData'));
const OrgList = lazy(() => import('pages/org/OrgList'));
const OrgAdd = lazy(() => import('pages/org/components/OrgAdd'));
const NoticeList = lazy(() => import('pages/notice/NoticeList'));
const NoticeAdd = lazy(() => import('pages/notice/components/NoticeAdd'));
const ProductList = lazy(() => import('pages/product'));
const CertificationList = lazy(() => import('pages/certification'));
const CertificationAdd = lazy(() => import('pages/certification/components/CertificationAdd'));
const DocCatalogList = lazy(() => import('pages/docCatalog'));

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
    path: "/cert/certDetail",
    component: CertDetail
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
    path: "/app/authList",
    component: AppAuthList
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
  },
  {
    path: "/org/orgAdd",
    component: OrgAdd
  },
  {
    path: "/notice/noticeList",
    component: NoticeList
  },
  {
    path: "/notice/noticeAdd",
    component: NoticeAdd
  },
  {
    path: "/product/productList",
    component: ProductList
  },
  {
    path: "/certification/list",
    component: CertificationList
  },
  {
    path: "/certification/add",
    component: CertificationAdd
  },
  {
    path: "/docCatalog/list",
    component: DocCatalogList
  },
];
export default routes;
