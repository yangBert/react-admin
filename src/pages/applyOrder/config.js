const status = {
  PRE_BUSSINESS_AUDIT: "PRE_BUSSINESS_AUDIT",
  AUDIT_TRUE: "AUDIT_TRUE",
  AUDIT_FALSE: "AUDIT_FALSE",
  get: s => {
    return s === "PRE_BUSSINESS_AUDIT" ? "待运营管理员审核" :
      s === "AUDIT_TRUE" ? "审核通过" :
        s === "AUDIT_FALSE" ? "审核不通过" :
          "--";
  }
};

const allStatus = {
  SUBMIT: "SUBMIT",
  PRE_PAY: "PRE_PAY",
  PRE_PARENT_AUDIT: "PRE_PARENT_AUDIT",
  PRE_BUSSINESS_AUDIT: "PRE_BUSSINESS_AUDIT",
  PRE_SYS_AUDIT: "PRE_SYS_AUDIT",
  AUDIT_TRUE: "AUDIT_TRUE",
  AUDIT_FALSE: "AUDIT_FALSE",
  FINISH: "FINISH",
  CANCLE: "CANCLE",
  DEL: "DEL",
  get: s => {
    return s === "SUBMIT" ? "暂存" :
      s === "PRE_PAY" ? "待支付" :
        s === "PRE_PARENT_AUDIT" ? "待上级审核" :
          s === "PRE_BUSSINESS_AUDIT" ? "待运营管理员审核" :
            s === "PRE_SYS_AUDIT" ? "待系统管理员审核" :
              s === "AUDIT_TRUE" ? "审核通过" :
                s === "AUDIT_FALSE" ? "审核不通过" :
                  s === "FINISH" ? "完成" :
                    s === "CANCLE" ? "取消" :
                      s === "DEL" ? "删除" : "--";
  }
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

export { status, allStatus, instanceType, image, allowTypesConfig };
