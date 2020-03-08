//登录权限查询
export const powerSelectAdminMenu = "/api/v1/uamBase/power/selectAdminMenu";

//管理员管理
export const managerRegistertURL = "/api/v1/uamBase/manager/register";
export const managerDeleteAdminURL = "/api/v1/uamBase/manager/deleteAdmin";
export const managerUpdateAdminInfoURL =
  "/api/v1/uamBase/manager/updateAdminInfo";
export const managerSelectAdminListURL =
  "/api/v1/uamBase/manager/selectAdminList";
export const managerLoginURL = "/api/v1/uamBase/manager/login.htm";
export const managerBuildRandNumURL =
  "/api/v1/uamBase/manager/buildRandNum.htm";
export const powerSelectUserRole = "/api/v1/uamBase/power/selectUserRole";
export const powerUserBindRole = "/api/v1/uamBase/power/userBindRole";
export const managerSelectLoginAdminInfo =
  "/api/v1/uamBase/manager/selectLoginAdminInfo";

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
export const certManageSelectCerts =
  "/api/v1/uamManager/certManage/selectCerts";
export const certManageInsert = "/api/v1/uamManager/certManage/insert";

//应用管理
export const plateSettingSelectAppData =
  "/api/v1/uamManager/plateSetting/SelectAppData";
export const plateSettingAddAppData =
  "/api/v1/uamManager/plateSetting/AddAppData";
export const plateSettingSelectAppAuthSecret =
  "/api/v1/uamManager/plateSetting/SelectAppAuthSecret";
export const plateSettingUpdateApp =
  "/api/v1/uamManager/plateSetting/UpdateApp";
export const plateSettingAppDetail =
  "/api/v1/uamManager/plateSetting/appDetail";
export const plateSettingAppAudit = "/api/v1/uamManager/plateSetting/appAudit";
export const plateSettingUpdateAppWithOutFile =
  "/api/v1/uamManager/plateSetting/UpdateAppWithOutFile";

//计费优惠策略管理
export const chargeAppDetail = "/api/v1/manager/chargeApp/detail";
export const chargeAppAdd = "/api/v1/manager/chargeApp/add";
export const chargeAppQueryByPage = "/api/v1/manager/chargeApp/queryByPage";
export const chargeAppDelete = "/api/v1/manager/chargeApp/delete";
export const chargeAppUpdate = "/api/v1/manager/chargeApp/update";

//字典管理
export const plateSettingSelectDictionaryType =
  "/api/v1/uamManager/plateSetting/SelectDictionaryType";
export const plateSettingAddDicType =
  "/api/v1/uamManager/plateSetting/AddDicType";
export const plateSettingDeleteDicType =
  "/api/v1/uamManager/plateSetting/DeleteDicType";
export const plateSettingUpdateDicType =
  "/api/v1/uamManager/plateSetting/UpdateDicType";

export const plateSettingSelectDictionaryApp =
  "/api/v1/uamManager/plateSetting/SelectDictionaryApp";
export const plateSettingUpdateDictionaryApp =
  "/api/v1/uamManager/plateSetting/UpdateDictionaryApp";
export const plateSettingAddDictionaryApp =
  "/api/v1/uamManager/plateSetting/AddDictionaryApp";
export const plateSettingDeleteDictionaryApp =
  "/api/v1/uamManager/plateSetting/DeleteDictionaryApp";

export const plateSettingAppType = "/api/v1/uamManager/plateSetting/AppType";
export const plateSettingDictByNine =
  "/api/v1/uamManager/plateSetting/DictByNine";
export const plateSettingLoginType =
  "/api/v1/uamManager/plateSetting/LoginType";
export const plateSettingSelectCA = "/api/v1/uamManager/plateSetting/SelectCA";

//文件上传
export const uploadUploadApplyFile = "/api/v1/upload/uploadApplyFile";
export const uploadDeleteFile = "/api/v1/upload/deleteFile";

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

//产品类型管理
export const productTypeSelectByPage =
  "/api/v1/manager/productType/selectByPage";
export const productTypeDelProductType =
  "/api/v1/manager/productType/delProductType";
export const productTypeAddProductType =
  "/api/v1/manager/productType/addProductType";
export const productTypeUpdateProductType =
  "/api/v1/manager/productType/updateProductType";
export const productTypeSelectAll = "/api/v1/manager/productType/selectAll";

//产品管理
export const productSelectByPage = "/api/v1/manager/product/selectByPage";
export const productAddProduct = "/api/v1/manager/product/addProduct";
export const productUpdateProduct = "/api/v1/manager/product/updateProduct";
export const productDelProduct = "/api/v1/manager/product/delProduct";
export const productAuthCondition = "/api/v1/manager/product/authCondition";

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
export const platSettingAddPlatSetting =
  "/api/v1/manager/platSetting/addPlatSetting";
export const platSettingUpdatePlatSetting =
  "/api/v1/manager/platSetting/updatePlatSetting";
export const platSettingDelete = "/api/v1/manager/platSetting/delete";

//计费策略管理
export const chargeRuleQueryByPage = "/api/v1/manager/chargeRule/queryByPage";
export const chargeRuleAdd = "/api/v1/manager/chargeRule/add";
export const chargeRuleUpdate = "/api/v1/manager/chargeRule/update";
export const chargeRuleDelete = "/api/v1/manager/chargeRule/delete";
export const chargeRuleDetail = "/api/v1/manager/chargeRule/detail";

//优惠策略管理
export const chargePreferentialAdd = "/api/v1/manager/chargePreferential/add";
export const chargePreferentialQueryByPage =
  "/api/v1/manager/chargePreferential/queryByPage";
export const chargePreferentialUpdate =
  "/api/v1/manager/chargePreferential/update";
export const chargePreferentialDetail =
  "/api/v1/manager/chargePreferential/detail";
export const chargePreferentialDelete =
  "/api/v1/manager/chargePreferential/delete";

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

//订单管理
export const webManagerQueryApplyPages = "/web/manager/apply/queryApplyPages";
export const webManagerGetApplyDetail = "/web/manager/apply/getApplyDetail";
export const webManagerAuditApply = "/web/manager/apply/auditApply";
export const webApplyGetFileList = "/web/apply/getFileList";

//友情链接管理
export const linkQueryLinksByPage = "/web/manager/link/queryLinksByPage";
export const webManagerLinkAdd = "/web/manager/link/add";
export const webManagerLinkUpdate = "/web/manager/link/update";
export const webManagerLinkChangeStatus = "/web/manager/link/changeStatus";

//常见问题管理
export const questionQueryQuestionByPage =
  "/web/manager/question/queryQuestionByPage";
export const webManagerQuestionAdd = "/web/manager/question/add";
export const webManagerQuestionUpdate = "/web/manager/question/update";
export const webManagerQuestionDetail = "/web/manager/question/detail";

//客户管理
export const clientUserChangeUserStatus = "/web/manager/user/changeUserStatus";
export const clientUserQueryUserByPage = "/web/manager/user/queryUserByPage";
export const webManagerUserRecharge = "/web/manager/user/userRecharge";
export const webManagerUserDetail = "/web/manager/user/detail";
export const webManagerUserChangeUserStatus =
  "/web/manager/user/changeUserStatus";

//接口管理
export const tokenPowerSelectInterList =
  "/api/v1/manager/tokenPower/selectInterList";
export const uamBaseTokenPowerNewInter = "/api/v1/manager/tokenPower/newInter";
export const uamBaseTokenPowerUpdateInter =
  "/api/v1/manager/tokenPower/updateInter";
export const uamBaseTokenPowerDeleteInter =
  "/api/v1/manager/tokenPower/deleteInter";
//export const siteNoticeIndexSysList = "/web/site/notice/indexSysList";

//token角色
export const uamBaseTokenPowerNewTokenRole =
  "/api/v1/manager/tokenPower/newTokenRole";
export const uamBaseTokenPowerSelectTokenRoleList =
  "/api/v1/manager/tokenPower/selectTokenRoleList";
export const uamBaseTokenPowerDeleteTokenRole =
  "/api/v1/manager/tokenPower/deleteTokenRole";
export const uamBaseTokenPowerUpdateTokenRole =
  "/api/v1/manager/tokenPower/updateTokenRole";
export const uamBaseTokenPowerNewTokenInterRole =
  "/api/v1/manager/tokenPower/newTokenInterRole";
export const uamBaseTokenPowerSelectTokenInterRoleList =
  "/api/v1/manager/tokenPower/selectTokenInterRoleList";
export const uamBaseTokenPowerUpdateRoleCacheSet =
  "/api/v1/manager/tokenPower/updateRoleCacheSet";

//签名验签服务器日志
export const verifySelectLog = "/api/v1/verify/selectLog";

//管理员日志
export const logManageSelectAdminLogs =
  "/api/v1/uamBase/manager/logManage/selectAdminLogs";

//应用日志
export const logManageSelectAppLogs =
  "/api/v1/uamBase/manager/logManage/selectAppLogs";

//用户日志
export const logManageSelectUserLogs =
  "/api/v1/uamBase/manager/logManage/selectUserLogs";

//安全策略
export const safeStrategyAddSafeStrategy =
  "/api/v1/safeStrategy/safeStrategy/addSafeStrategy";
export const safeStrategySelectAll =
  "/api/v1/safeStrategy/safeStrategy/selectAll";
export const updateSafeStrategy =
  "/api/v1/safeStrategy/safeStrategy/updateSafeStrategy";
export const delSafeStrategy =
  "/api/v1/safeStrategy/safeStrategy/delSafeStrategy";

//API接口类型
export const webSiteSelectAPITypes = "/api/v1/manager/oApi/selectAllTypes";
export const managerOApiInsertType = "/api/v1/manager/oApi/insertType";
export const managerOApiUpdateType = "/api/v1/manager/oApi/updateType";

//共有API接口
export const managerOApiInsertOpenApi = "/api/v1/manager/oApi/insertOpenApi";
export const managerOApiSelectPageOApi = "/api/v1/manager/oApi/selectPageOApi";
export const managerOApiUpdateOpenApi = "/api/v1/manager/oApi/updateOpenApi";

//API参数列表
export const managerOApiInsertParam = "/api/v1/manager/oApi/insertParam";
export const managerOApiSelectAllParamByApiId =
  "/api/v1/manager/oApi/selectAllParamByApiId";
export const managerOApiUpdateParam = "/api/v1/manager/oApi/updateParam";
