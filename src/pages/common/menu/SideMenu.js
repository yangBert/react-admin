import React, { Component, Fragment } from 'react';
import SideMenuUI from './SideMenuUI';
import { connect } from 'react-redux';
import * as creators from './store/creators';

class SideMenu extends Component {

  componentDidMount() {
    this.props.initMenu();
  }

  render() {
    const menus = this.props.menus
    return (
      <Fragment>
        {menus.length > 0 ? <SideMenuUI menus={menus} /> : ''}
      </Fragment>
    )
  }
  
}

const mapState = state => ({
  menus: state.sideMenu.menus,
});

const mapDispatch = dispatch => ({
  initMenu: () => {
    const action = creators.getMenus();
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(SideMenu);