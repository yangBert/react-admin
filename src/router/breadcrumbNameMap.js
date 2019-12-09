import React from 'react';
import { Link } from 'react-router-dom';
const breadcrumbNameMap = {
  '/system': '系统管理',
  '/system/userList': '管理员列表',
  '/system/menuList': '菜单管理',
  '/role': '权限管理',
  '/role/roleList': '角色管理',
};

export default function switchURL(url) {
  const name = breadcrumbNameMap[url]
  const bl = url === "/system"
  if (bl) {
    return <span>{name}</span>
  } else {
    return <Link to={url}>{name}</Link>
  }
}