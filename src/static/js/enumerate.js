
//基本状态
const baseState = {
  data: ["NORMAL", "LOCK", "FREEZE", "INVILD"],
  get: function (s) {
    return s === "LOCK" ? "锁定" :
      s === "NORMAL" ? "正常" :
        s === "FREEZE" ? "冻结" :
          s === "INVILD" ? "无效" :
            s === "DEL" ? "删除" :
              "未定义"
  }
}

//接口接入方式
const interfaceTypes = {
  data: ["RESTFUL", "WEBSERVICE", "JAR", "JNI", "OTHER"],
  get: function (s) {
    return s === "RESTFUL" ? "restful接口" :
      s === "WEBSERVICE" ? "webservice接口" :
        s === "JAR" ? "jar包" :
          s === "JNI" ? "JNI" :
            s === "OTHER" ? "其他" :
              "未定义"
  }
}

//认证源安全等级
const authSafety = {
  data: ["I", "II", "III", "IV"],
  get: function (s) {
    return s === "I" ? "I级" :
      s === "II" ? "II级" :
        s === "III" ? "III级" :
          s === "IV" ? "IV级" :
            "未定义"
  }
}

export {
  baseState,
  interfaceTypes,
  authSafety
}
