const status = {
  NORMAL: "正常",
  INVILD: "无效",
  LOCK: "锁定",
  FREEZE: "冻结",
  DEL: "删除",
}

const statusMap = [
  { value: "NORMAL", name: "正常" },
  { value: "INVILD", name: "无效" },
  { value: "LOCK", name: "锁定" },
  { value: "FREEZE", name: "冻结" },
  { value: "DEL", name: "删除" }
]

export {
  status,
  statusMap
}