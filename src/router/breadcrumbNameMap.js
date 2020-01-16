import React from 'react';
import { Link } from 'react-router-dom';
const breadcrumbNameMap = {
  '/system': '系统管理',
  '/system/adminList': '管理员管理',
  '/system/menuList': '菜单管理',
  '/system/roleList': '角色管理',

  '/platform': '系统管理',
  '/platform/userList': '用户管理',

  '/app': '平台管理',
  '/app/appList': '应用管理',
  '/app/appList/add': '编辑应用',
};

export default function switchURL(url) {
  const name = breadcrumbNameMap[url]
  const bl = url.split("/").length === 2
  if (bl) {
    return <span>{name}</span>
  } else {
    return <Link to={url}>{name}</Link>
  }
}