export default {
  getState: function (v) {
    return v === 0 ? "已作废" : v = 1 ? "未审核" : v === 2 ? "审核通过" : v === 4 ? "已发布" : "未定义";
  }
}