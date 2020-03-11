const accountType = {
  PERSON: "个人用户",
  ORG: "机构用户",
  GOV: "政府",
  POS: "个体商户",
  OTHER: "其它"
};

const status = {
  NORMAL: "正常",
  FREEZE: "冻结",
  INVILD: "无效",
  DEL: "删除"
};

const rechargeType = [
  { value: "PERSON", name: "个人用户" },
  { value: "ORG", name: "机构用户" },
  { value: "GOV", name: "政府" },
  { value: "POS", name: "个体商户" },
  { value: "OTHER", name: "其它" }
];

export { accountType, status, rechargeType };
