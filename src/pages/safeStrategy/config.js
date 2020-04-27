
const status = {
  NORMAL: "正常",
  INVILD: "无效",
  LOCK: "锁定",
  FREEZE: "冻结",
}

const statusMap = [
  { value: "NORMAL", name: "正常" },
  { value: "INVILD", name: "无效" },
  { value: "LOCK", name: "锁定" },
  { value: "FREEZE", name: "冻结" }
]

const record = {
  strategyName: "",
  strategyCode: "",
  strategyStatus: ""
}

export {
  status,
  statusMap,
  record
}