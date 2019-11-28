import React from 'react';
import styles from 'pages/common/header/header.module.css';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import * as types from './store/actionTypes';
import UserCenter from './UserCenter';

class Header extends React.Component {

  render() {
    return (
      <div className={styles.header}>
        <Icon className={styles.collapsedBtn} onClick={this.props.changeMenuCollapsed} type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        <h1 className={styles.title}>可信身份统一认证系统</h1>
        <UserCenter />
      </div>
    )
  }
}

const mapState = state => ({
  collapsed: state.header.collapsed
})

const mapDispatch = dispatch => ({
  changeMenuCollapsed: () => {
    const action = {type: types.CHANGE_MENU_COLLAPSED};
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Header);