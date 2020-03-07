const status = {
  SUBMIT: "暂存",
  PRE_PAY: "待支付",
  PRE_PARENT_AUDIT: "待上级审核",
  PRE_BUSSINESS_AUDIT: "待运营管理员审核",
  PRE_SYS_AUDIT: "待系统管理员审核",
  AUDIT_TRUE: "审核通过",
  AUDIT_FALSE: "审核不通过",
  FINISH: "完成",
  CANCLE: "取消",
  DEL: "删除"
};

const instanceType = {
  APPLICATION: "应用",
  CA: "CA",
  INTERFACE: "接口",
  ORG: "机构"
};

const image = {
  AUTH: { name: "授权书", code: "AUTH" },
  BL: { name: "营业执照", code: "BL" },
  CA: { name: "CA资质", code: "CA" },
  IDCARD_F: { name: "身份证正面", code: "IDCARD_F" },
  IDCARD_B: { name: "身份证反面", code: "IDCARD_B" },
  IDCARD_P: { name: "人证照", code: "IDCARD_P" },
  LOGO: { name: "LOGO照片", code: "LOGO" },
  SYS: { name: "系统证明照", code: "SYS" }
};

const allowTypesConfig = [
  { label: "数字证书", value: "usbKey" },
  { label: "手机盾", value: "mobileShield" }
];

export { status, instanceType, image, allowTypesConfig };
