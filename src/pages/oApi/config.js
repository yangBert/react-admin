const state = {
  NORMAL: "正常",
  INVILD: "无效"
};
const apiReqType = ["POST", "GET"];
const apiParamType = [
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/xml"
];

export { state, apiReqType, apiParamType };
