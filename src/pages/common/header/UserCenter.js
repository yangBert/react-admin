import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from 'pages/common/header/userCenter.module.css';
import PropsContext from 'pages/index/props';
import $$ from 'static/js/base.js';

function UserCenter() {
  const propsGlobal = React.useContext(PropsContext);
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => $$.logout(propsGlobal)}>
        <Icon
          className={styles.logout}
          type="logout"
        />退出登录
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        <Icon className={styles.setting} type="setting" />个人设置
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <div className={styles.container}>
        <img className={styles.userImage} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
        <span>admin</span>
      </div>
    </Dropdown>
  )
}

export default UserCenter;