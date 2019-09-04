const defaultState = {
  menus: [
    {
      id: "sub1",
      title: "用户管理",
      icon: "user-add",
      childs: [
        {
          id: "1",
          title: "用户列表",
          path: "/pages/userList"
        },
        {
          id: "2",
          title: "用户详情",
          path: "/pages/userDetail"
        },
      ]
    },
    {
      id: "sub2",
      title: "应用管理",
      icon: "appstore",
      childs: [
        {
          id: "3",
          title: "应用列表",
          path: "/pages/appList"
        },
        {
          id: "4",
          title: "应用详情",
          path: "/pages/appDetail"
        },
      ]
    }
  ]
};

export default (state = defaultState, action) => {
  return state;
}