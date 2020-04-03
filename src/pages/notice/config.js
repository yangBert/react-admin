export default {
  state: {
    arr: [{ value: 0, name: "已作废" }, { value: 1, name: "未发布" }, { value: 2, name: "审核未通过" }, { value: 3, name: "审核通过" }, { value: 4, name: "已发布" }],
    get(s) {
      return s === 0 ? "已作废" : s === 1 ? "未发布" : s === 2 ? "审核未通过" : s === 3 ? "审核通过" : s === 4 ? "已发布" : "--";
    }
  },
  noticeType: [{ value: "SYS", name: "系统公告" }, { value: "OP", name: "运营公告" }]
}

