const status = {
  NORMAL: "NORMAL",
  INVILD: "INVILD",
  DEL: "DEL",
  get: s => {
    return s === "NORMAL"
      ? "已上架"
      : s === "INVILD"
      ? "已下架"
      : s === "DEL"
      ? "已删除"
      : "未定义";
  }
};

const productPaying = [
  { value: "0", name: "实时收费" },
  { value: "1", name: "一次性收费" }
];

export { status, productPaying };
