import { lazy } from 'react';
const Home = lazy(() => import('pages/home'));
const ErrorResult = lazy(() => import('pages/common/error/ErrorResult'));
const AdminList = lazy(() => import('pages/admin/AdminList'));
const MenuList = lazy(() => import('pages/menu/MenuList'));
const RoleList = lazy(() => import('pages/role/RoleList'));
const UserList = lazy(() => import('pages/user/UserList'));
const CertList = lazy(() => import('pages/cert/CertList'));
const CertDetail = lazy(() => import('pages/cert/components/CertDetail'));
const AppList = lazy(() => import('pages/app/AppList'));
const AppAdd = lazy(() => import('pages/app/components/AppAdd'));
const AppChargeApp = lazy(() => import('pages/app/components/chargeApp'));
const AppAuthList = lazy(() => import('pages/app/components/AppAuthList'));
const AppDetail = lazy(() => import('pages/app/components/Detail'));
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
const DocCatalogAdd = lazy(() => import('pages/docCatalog/components/Add'));
const DocList = lazy(() => import('pages/doc'));
const DocAdd = lazy(() => import('pages/doc/components/Add'));
const PlatSettingList = lazy(() => import('pages/platSetting'));
const PlatSettingAdd = lazy(() => import('pages/platSetting/components/Add'));
const BillingList = lazy(() => import('pages/billing'));
const BillingAdd = lazy(() => import('pages/billing/components/Add'));
const ProductTypeList = lazy(() => import('pages/productType'));
const PreferentialList = lazy(() => import('pages/preferential'));
const PreferentialAdd = lazy(() => import('pages/preferential/components/Add'));
const AccountList = lazy(() => import('pages/account'));
const AccountAdd = lazy(() => import('pages/account/components/Add'));
const AccountDetail = lazy(() => import('pages/account/components/Detail'));
const ChargeConsumeList = lazy(() => import('pages/chargeConsume'));
const ChargeRechargeList = lazy(() => import('pages/chargeRecharge'));
const ApplyOrderList = lazy(() => import('pages/applyOrder'));
const ApplyOrderDetail = lazy(() => import('pages/applyOrder/components/Detail'));
const LinkList = lazy(() => import('pages/link'));
const LinkAdd = lazy(() => import('pages/link/components/Add'));
const QuestionList = lazy(() => import('pages/question'));
const QuestionAdd = lazy(() => import('pages/question/components/Add'));
const ClientUserList = lazy(() => import('pages/clientUser'));
const ClientUserDetail = lazy(() => import('pages/clientUser/components/Detail'));
const TokenPowerList = lazy(() => import('pages/tokenPower'));
const TokenPowerAdd = lazy(() => import('pages/tokenPower/components/Add'));
const TokenRoleList = lazy(() => import('pages/tokenRole'));
const TokenRoleAdd = lazy(() => import('pages/tokenRole/components/Add'));

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
    path: "/app/appList/add",
    component: AppAdd
  },
  {
    path: "/app/chargeApp",
    component: AppChargeApp
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
  {
    path: "/docCatalog/add",
    component: DocCatalogAdd
  },
  {
    path: "/doc/list",
    component: DocList
  },
  {
    path: "/doc/add",
    component: DocAdd
  },
  {
    path: "/platSetting/list",
    component: PlatSettingList
  },
  {
    path: "/platSetting/add",
    component: PlatSettingAdd
  },
  {
    path: "/billing/list",
    component: BillingList
  },
  {
    path: "/billing/add",
    component: BillingAdd
  },
  {
    path: "/productType/list",
    component: ProductTypeList
  },
  {
    path: "/account/list",
    component: AccountList
  },
  {
    path: "/account/add",
    component: AccountAdd
  },
  {
    path: "/account/detail",
    component: AccountDetail
  },
  {
    path: "/preferential/list",
    component: PreferentialList
  },
  {
    path: "/preferential/add",
    component: PreferentialAdd
  },
  {
    path: "/chargeConsume/list",
    component: ChargeConsumeList
  },
  {
    path: "/chargeRecharge/list",
    component: ChargeRechargeList
  },
  {
    path: "/applyOrder/list",
    component: ApplyOrderList
  },
  {
    path: "/applyOrder/detail",
    component: ApplyOrderDetail
  },
  {
    path: "/link/list",
    component: LinkList
  },
  {
    path: "/link/add",
    component: LinkAdd
  },
  {
    path: "/question/list",
    component: QuestionList
  },
  {
    path: "/question/add",
    component: QuestionAdd
  },
  {
    path: "/clientUser/list",
    component: ClientUserList
  },
  {
    path: "/clientUser/detail",
    component: ClientUserDetail
  },
  {
    path: "/tokenPower/list",
    component: TokenPowerList
  },
  {
    path: "/tokenPower/add",
    component: TokenPowerAdd
  },
  {
    path: "/tokenRole/list",
    component: TokenRoleList
  },
  {
    path: "/tokenRole/add",
    component: TokenRoleAdd
  },

];
export default routes;
