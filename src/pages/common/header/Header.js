import React from 'react';
import styles from 'pages/common/header/header.module.css';
import { Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as types from './store/actionTypes';
import UserCenter from './UserCenter';
import logo from 'static/img/logo.png';
import platForm from 'static/js/config';
//import HistoryLink from 'pages/common/history/HistoryLink';
function Header(props) {
  return (
    <div>
      <div className={`${styles.header} clearfix`}>
        <div className="pullLeft">
          <Icon title={props.collapsed ? '显示菜单栏' : '隐藏菜单栏'} className={`${styles.collapsedBtn} pullLeft`} onClick={props.changeMenuCollapsed} type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
          <img className={`${styles.logo} pullLeft`} src={logo} alt="logo" />
          <h1 className={`${styles.title} pullLeft`}>{platForm.platFormName}</h1>
        </div>
        <div className="pullRight">
          <UserCenter />
        </div>
      </div>

      {/* <div className={styles.history}>
        <HistoryLink />
      </div> */}
    </div>
  )
}

const mapState = state => ({
  collapsed: state.header.collapsed
})

const mapDispatch = dispatch => ({
  changeMenuCollapsed: () => {
    const action = { type: types.CHANGE_MENU_COLLAPSED };
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(Header));