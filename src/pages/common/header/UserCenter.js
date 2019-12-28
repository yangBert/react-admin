import React, { useEffect } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import styles from 'pages/common/header/userCenter.module.css';
import PropsContext from 'pages/index/props';
import $$ from 'static/js/base.js';
import * as creators from './store/creators';
import { connect } from 'react-redux';

function UserCenter(props) {
  const propsGlobal = React.useContext(PropsContext);
  const getAdminInfo = props.getAdminInfo
  useEffect(() => {
    getAdminInfo({ propsGlobal })
  }, [propsGlobal, getAdminInfo]);

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
      <div className={`${styles.container} clearfix`}>
        <img className={`${styles.userImage} pullLeft`} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
        <span className={`${styles.userName} pullLeft`}>
          欢迎您，
            {props.adminInfo ? props.adminInfo.adminName : ""}
        </span>

      </div>
    </Dropdown >
  )
}

const mapState = state => ({
  adminInfo: state.header.adminInfo
})

const mapDispatch = dispatch => ({
  getAdminInfo: req => {
    const action = creators.getAdminInfoAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(UserCenter);