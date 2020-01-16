
//登录权限查询
export const powerSelectAdminMenu = "/api/v1/uamBase/power/selectAdminMenu";

//管理员管理
export const managerRegistertURL = "/api/v1/uamBase/manager/register";
export const managerDeleteAdminURL = "/api/v1/uamBase/manager/deleteAdmin";
export const managerUpdateAdminInfoURL = "/api/v1/uamBase/manager/updateAdminInfo";
export const managerSelectAdminListURL = "/api/v1/uamBase/manager/selectAdminList";
export const managerLoginURL = "/api/v1/uamBase/manager/login.htm";
export const managerBuildRandNumURL = "/api/v1/uamBase/manager/buildRandNum.htm";
export const powerSelectUserRole = "/api/v1/uamBase/power/selectUserRole";
export const powerUserBindRole = "/api/v1/uamBase/power/userBindRole";
export const managerSelectLoginAdminInfo = "/api/v1/uamBase/manager/selectLoginAdminInfo";

//角色管理
export const powerNewRoleURL = "/api/v1/uamBase/power/newRole";
export const powerSelectAllRoleURL = "/api/v1/uamBase/power/selectAllRole";
export const powerDeleteRoleURL = "/api/v1/uamBase/power/deleteRole";
export const powerUpdateRoleURL = "/api/v1/uamBase/power/updateRole";
export const powerUserBindMenu = "/api/v1/uamBase/power/userBindMenu";
export const powerSelectUserMenu = "/api/v1/uamBase/power/selectUserMenu";

//菜单管理
export const powerSelectAllMenu = "/api/v1/uamBase/power/selectAllMenu";
export const powerNewMenu = "/api/v1/uamBase/power/newMenu";
export const powerUpdateMenu = "/api/v1/uamBase/power/updateMenu";
export const powerDeleteMenu = "/api/v1/uamBase/power/deleteMenu";

//用户管理
export const userSelectUsers = "/api/v1/uamBase/user/selectUsers";

//证书管理
export const certManageSelectCerts = "/api/v1/uamManager/certManage/selectCerts";
export const certManageInsert = "/api/v1/uamManager/certManage/insert";

//应用管理
export const plateSettingSelectAppData = "/api/v1/uamManager/plateSetting/SelectAppData";
export const plateSettingAddAppData = "/api/v1/uamManager/plateSetting/AddAppData";
export const plateSettingSelectAppAuthSecret = "/api/v1/uamManager/plateSetting/SelectAppAuthSecret";
export const plateSettingUpdateApp = "/api/v1/uamManager/plateSetting/UpdateApp";
export const plateSettingAppDetail = "/api/v1/uamManager/plateSetting/appDetail";
export const plateSettingAppAudit = "/api/v1/uamManager/plateSetting/appAudit";
export const plateSettingUpdateAppWithOutFile = "/api/v1/uamManager/plateSetting/UpdateAppWithOutFile";


//字典管理
export const plateSettingSelectDictionaryType = "/api/v1/uamManager/plateSetting/SelectDictionaryType";
export const plateSettingAddDicType = "/api/v1/uamManager/plateSetting/AddDicType";
export const plateSettingDeleteDicType = "/api/v1/uamManager/plateSetting/DeleteDicType";
export const plateSettingUpdateDicType = "/api/v1/uamManager/plateSetting/UpdateDicType";

export const plateSettingSelectDictionaryApp = "/api/v1/uamManager/plateSetting/SelectDictionaryApp";
export const plateSettingUpdateDictionaryApp = "/api/v1/uamManager/plateSetting/UpdateDictionaryApp";
export const plateSettingAddDictionaryApp = "/api/v1/uamManager/plateSetting/AddDictionaryApp";
export const plateSettingDeleteDictionaryApp = "/api/v1/uamManager/plateSetting/DeleteDictionaryApp";

export const plateSettingAppType = "/api/v1/uamManager/plateSetting/AppType";
export const plateSettingDictByNine = "/api/v1/uamManager/plateSetting/DictByNine";
export const plateSettingLoginType = "/api/v1/uamManager/plateSetting/LoginType";
export const plateSettingSelectCA = "/api/v1/uamManager/plateSetting/SelectCA";

//文件上传
export const uploadUploadApplyFile = "/api/v1/upload/uploadApplyFile";

//机构管理
export const orgQueryByPage = "/api/v1/manager/org/queryByPage";
export const orgQueryAllOrgTree = "/api/v1/manager/org/queryAllOrgTree";
export const orgAddOrg = "/api/v1/manager/org/addOrg";
export const orgUpdateOrg = "/api/v1/manager/org/updateOrg";
export const orgUpdateOrgState = "/api/v1/manager/org/updateOrgState";

//公告管理
export const noticeQueryByPage = "/api/v1/manager/notice/queryByPage";
export const noticeUpdateNotice = "/api/v1/manager/notice/updateNotice";
export const noticePublishNotice = "/api/v1/manager/notice/publishNotice";
export const noticeAddNotice = "/api/v1/manager/notice/addNotice";
export const noticeGetNoticeDetail = "/api/v1/manager/notice/getNoticeDetail";

//产品管理
export const productSelectByPage = "/api/v1/manager/product/selectByPage";
export const productAddProduct = "/api/v1/manager/product/addProduct";
export const productUpdateProduct = "/api/v1/manager/product/updateProduct";
export const productDelProduct = "/api/v1/manager/product/delProduct";

//认证源管理
export const authSelectByPage = "/api/v1/manager/auth/selectByPage";
export const authAddAuth = "/api/v1/manager/auth/addAuth";
export const authUpdateAuth = "/api/v1/manager/auth/updateAuth";
export const authDelAuth = "/api/v1/manager/auth/delAuth";
export const authGetAuthLevel = "/api/v1/manager/auth/getAuthLevel";

//文档管理
export const docQueryCatalogPages = "/api/v1/manager/doc/queryCatalogPages";
export const docAddDocCatalog = "/api/v1/manager/doc/addDocCatalog";
export const docUpdateDocCatalog = "/api/v1/manager/doc/updateDocCatalog";
export const docQueryContentPages = "/api/v1/manager/doc/queryContentPages";
export const docAddDocContent = "/api/v1/manager/doc/addDocContent";
export const docUpdateDocContent = "/api/v1/manager/doc/updateDocContent";

//系统配置
export const platSettingQueryByPage = "/api/v1/manager/platSetting/queryByPage";
export const platSettingAddPlatSetting = "/api/v1/manager/platSetting/addPlatSetting";
export const platSettingUpdatePlatSetting = "/api/v1/manager/platSetting/updatePlatSetting";
export const platSettingDelete = "/api/v1/manager/platSetting/delete";

//计费策略管理
export const chargeRuleQueryByPage = "/api/v1/manager/chargeRule/queryByPage";
export const chargeRuleAdd = "/api/v1/manager/chargeRule/add";
export const chargeRuleUpdate = "/api/v1/manager/chargeRule/update";
export const chargeRuleDelete = "/api/v1/manager/chargeRule/delete";
export const chargeRuleDetail = "/api/v1/manager/chargeRule/detail";

//优惠策略管理
export const chargePreferentialAdd = "/api/v1/manager/chargePreferential/add";
export const chargePreferentialQueryByPage = "/api/v1/manager/chargePreferential/queryByPage";
export const chargePreferentialUpdate = "/api/v1/manager/chargePreferential/update";
export const chargePreferentialDetail = "/api/v1/manager/chargePreferential/detail";
export const chargePreferentialDelete = "/api/v1/manager/chargePreferential/delete";

//收费账户管理
export const accountQueryByPage = "/api/v1/account/queryByPage";
export const accountAddCount = "/api/v1/account/addCount";
export const accountDetail = "/api/v1/account/detail";
export const accountUpdateAccount = "/api/v1/account/updateAccount";

//计费相关
export const chargeConsume = "/api/v1/charge/consume";
export const chargeConsumeRecordByPage = "/api/v1/charge/consumeRecordByPage";
export const chargeConsumeDetail = "/api/v1/charge/consumeDetail";
export const chargeRecharge = "/api/v1/charge/recharge";
export const chargeRechargeRecordByPage = "/api/v1/charge/rechargeRecordByPage";
export const chargeRechargeDetail = "/api/v1/charge/rechargeDetail";




















