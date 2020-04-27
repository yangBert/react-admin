const state = {
  NORMAL: "正常",
  INVILD: "无效"
};

const stateMap = [
  { value: "NORMAL", name: "正常" },
  { value: "INVILD", name: "无效" }
];

const apiReqType = ["POST", "GET"];
const apiParamType = [
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data",
];

export { state, stateMap, apiReqType, apiParamType };
