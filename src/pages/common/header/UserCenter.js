import React, { useEffect } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from 'pages/common/header/userCenter.module.css';
import { connect } from 'react-redux';
import PropsContext from 'pages/index/props';
import * as creators from 'pages/login/store/creators';
import $$ from 'static/js/base.js';

function UserCenter(props) {
  const propsGlobal = React.useContext(PropsContext);
  useEffect(() => {
    if($$.token.get() === ""){
      //$$.logout(propsGlobal)
    }
  });
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => props.logoutFn(propsGlobal)}>
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

const mapState = state => ({
  loginState: state.login.loginState
})

const mapDispatch = dispatch => ({
  logoutFn: propsGlobal => {
    const action = creators.logoutAction(propsGlobal)
    dispatch(action)

  }
})

export default connect(mapState, mapDispatch)(UserCenter);