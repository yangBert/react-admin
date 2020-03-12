import { lazy } from "react";
const Home = lazy(() => import("pages/home"));
const ErrorResult = lazy(() => import("pages/common/error/ErrorResult"));
const AdminList = lazy(() => import("pages/admin/AdminList"));
const MenuList = lazy(() => import("pages/menu/MenuList"));
const RoleList = lazy(() => import("pages/role/RoleList"));
const UserList = lazy(() => import("pages/user/UserList"));
const CertList = lazy(() => import("pages/cert/CertList"));
const CertDetail = lazy(() => import("pages/cert/components/CertDetail"));
const AppList = lazy(() => import("pages/app/AppList"));
const AppAdd = lazy(() => import("pages/app/components/AppAdd"));
const AppChargeApp = lazy(() => import("pages/app/components/chargeApp"));
const AppAuthList = lazy(() => import("pages/app/components/AppAuthList"));
const AppDetail = lazy(() => import("pages/app/components/Detail"));
const DictTypeList = lazy(() => import("pages/dictType/DictTypeList"));
const DictDataList = lazy(() => import("pages/dictData"));
const OrgList = lazy(() => import("pages/org/OrgList"));
const OrgAdd = lazy(() => import("pages/org/components/OrgAdd"));
const NoticeList = lazy(() => import("pages/notice/NoticeList"));
const NoticeAdd = lazy(() => import("pages/notice/components/NoticeAdd"));
const ProductList = lazy(() => import("pages/product"));
const ProductAdd = lazy(() => import("pages/product/components/Add"));
const ProductTypeList = lazy(() => import("pages/productType"));
const CertificationList = lazy(() => import("pages/certification"));
const CertificationAdd = lazy(() =>
  import("pages/certification/components/CertificationAdd")
);
const DocCatalogList = lazy(() => import("pages/docCatalog"));
const DocCatalogAdd = lazy(() => import("pages/docCatalog/components/Add"));
const DocList = lazy(() => import("pages/doc"));
const DocAdd = lazy(() => import("pages/doc/components/Add"));
const PlatSettingList = lazy(() => import("pages/platSetting"));
const PlatSettingAdd = lazy(() => import("pages/platSetting/components/Add"));
const BillingList = lazy(() => import("pages/billing"));
const BillingAdd = lazy(() => import("pages/billing/components/Add"));
const PreferentialList = lazy(() => import("pages/preferential"));
const PreferentialAdd = lazy(() => import("pages/preferential/components/Add"));
const AccountList = lazy(() => import("pages/account"));
const AccountAdd = lazy(() => import("pages/account/components/Add"));
const AccountDetail = lazy(() => import("pages/account/components/Detail"));
const ChargeConsumeList = lazy(() => import("pages/chargeConsume"));
const ChargeRechargeList = lazy(() => import("pages/chargeRecharge"));
const ChargeRechargeDetail = lazy(() =>
  import("pages/chargeRecharge/components/Detail")
);
const ApplyOrderList = lazy(() => import("pages/applyOrder"));
const ApplyOrderDetail = lazy(() =>
  import("pages/applyOrder/components/Detail")
);
const LinkList = lazy(() => import("pages/link"));
const LinkAdd = lazy(() => import("pages/link/components/Add"));
const QuestionList = lazy(() => import("pages/question"));
const QuestionAdd = lazy(() => import("pages/question/components/Add"));
const ClientUserList = lazy(() => import("pages/clientUser"));
const ClientUserDetail = lazy(() =>
  import("pages/clientUser/components/Detail")
);
const TokenPowerList = lazy(() => import("pages/tokenPower"));
const TokenPowerAdd = lazy(() => import("pages/tokenPower/components/Add"));
const TokenRoleList = lazy(() => import("pages/tokenRole"));
const TokenRoleAdd = lazy(() => import("pages/tokenRole/components/Add"));
const TokenConfigRole = lazy(() =>
  import("pages/tokenRole/components/ConfigRole")
);
const VerifyServerLogList = lazy(() => import("pages/verifyServer"));
const VerifyServerDetail = lazy(() =>
  import("pages/verifyServer/components/Detail")
);
const ChargeConfigList = lazy(() => import("pages/chargeConfig"));
const ChargeConfigAdd = lazy(() => import("pages/chargeConfig/components/Add"));
const ChargeConfigPreferential = lazy(() =>
  import("pages/chargeConfig/components/Preferential")
);
const ChargeConfigBilling = lazy(() =>
  import("pages/chargeConfig/components/Billing")
);
const ChargeConfigProduct = lazy(() =>
  import("pages/chargeConfig/components/Product")
);
const AdminLogsList = lazy(() => import("pages/adminLogs"));
const adminLogsDetail = lazy(() => import("pages/adminLogs/components/Detail"));
const SafeStrategyList = lazy(() => import("pages/safeStrategy"));

const ApplyOrderAuditList = lazy(() =>
  import("pages/applyOrder/components/auditList")
);
const ApplyOrderApplicationAudit = lazy(() =>
  import("pages/applyOrder/components/ApplicationAudit")
);
const ApplyOrderCaAudit = lazy(() =>
  import("pages/applyOrder/components/CaAudit")
);
const ApplyOrderInterfaceAudit = lazy(() =>
  import("pages/applyOrder/components/InterfaceAudit")
);
const ApplyOrderOrgAudit = lazy(() =>
  import("pages/applyOrder/components/OrgAudit")
);
const OApiTypesList = lazy(() => import("pages/oApiTypes"));
const OAPIList = lazy(() => import("pages/oApi"));
const OAPIDetail = lazy(() => import("pages/oApi/components/Detail"));
const OAPIAdd = lazy(() => import("pages/oApi/components/Add"));
const OApiParamsList = lazy(() => import("pages/oApiParams"));
const OApiParamsAdd = lazy(() => import("pages/oApiParams/components/Add"));
const OApiParamsDetail = lazy(() =>
  import("pages/oApiParams/components/Detail")
);
const AccountRecharge = lazy(() => import("pages/account/components/Recharge"));
const UserLogsList = lazy(() => import("pages/userLogs"));
const UserLogsDetail = lazy(() => import("pages/userLogs/components/Detail"));
const AppLogsList = lazy(() => import("pages/appLogs"));
const AppLogsDetail = lazy(() => import("pages/appLogs/components/Detail"));
const ChargeConsumeDetail = lazy(() =>
  import("pages/chargeConsume/components/Detail")
);

const routes = [
  {
    path: "/oApi/detail",
    component: OAPIDetail
  },
  {
    path: "/appLogs/list",
    component: AppLogsList
  },
  {
    path: "/appLogs/detail",
    component: AppLogsDetail
  },
  {
    path: "/userLogs/list",
    component: UserLogsList
  },
  {
    path: "/userLogs/detail",
    component: UserLogsDetail
  },
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
    path: "/product/add",
    component: ProductAdd
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
    path: "/chargeConsume/detail",
    component: ChargeConsumeDetail
  },
  {
    path: "/chargeRecharge/list",
    component: ChargeRechargeList
  },
  {
    path: "/chargeRecharge/detail",
    component: ChargeRechargeDetail
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
    path: "/applyOrder/auditList",
    component: ApplyOrderAuditList
  },
  {
    path: "/applyOrder/application/audit",
    component: ApplyOrderApplicationAudit
  },
  {
    path: "/applyOrder/ca/audit",
    component: ApplyOrderCaAudit
  },
  {
    path: "/applyOrder/interface/audit",
    component: ApplyOrderInterfaceAudit
  },
  {
    path: "/applyOrder/org/audit",
    component: ApplyOrderOrgAudit
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
  {
    path: "/tokenRole/config",
    component: TokenConfigRole
  },
  {
    path: "/verifyServer/logList",
    component: VerifyServerLogList
  },
  {
    path: "/verifyServer/detail",
    component: VerifyServerDetail
  },
  {
    path: "/chargeConfig/list",
    component: ChargeConfigList
  },
  {
    path: "/chargeConfig/add",
    component: ChargeConfigAdd
  },
  {
    path: "/chargeConfig/creferential",
    component: ChargeConfigPreferential
  },
  {
    path: "/chargeConfig/billing",
    component: ChargeConfigBilling
  },
  {
    path: "/chargeConfig/product",
    component: ChargeConfigProduct
  },
  {
    path: "/adminLogs/list",
    component: AdminLogsList
  },
  {
    path: "/adminLogs/detail",
    component: adminLogsDetail
  },
  {
    path: "/safeStrategy/list",
    component: SafeStrategyList
  },
  {
    path: "/oApiTypes/list",
    component: OApiTypesList
  },
  {
    path: "/oApi/list",
    component: OAPIList
  },
  {
    path: "/oApi/add",
    component: OAPIAdd
  },
  {
    path: "/oApiParams/list",
    component: OApiParamsList
  },
  {
    path: "/oApiParams/add",
    component: OApiParamsAdd
  },
  {
    path: "/oApiParams/detail",
    component: OApiParamsDetail
  },
  {
    path: "/account/recharge",
    component: AccountRecharge
  }
];
export default routes;
