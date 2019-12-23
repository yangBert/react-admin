import React, { Component } from 'react';
import SideMenuUI from './SideMenuUI';
import { connect } from 'react-redux';
import * as creators from 'pages/common/menu/store/creators';
import { withRouter } from 'react-router';

class SideMenu extends Component {

  componentDidMount() {
    this.props.getSliderMenu({ props: this.props, data: {} });
    //this.props.queryMenuListTest({ props: this.props, data: { pageNo: 1, pageSize: 100 } })
  }

  render() {
    //const menus = this.props.menus
    return <SideMenuUI ></SideMenuUI>
  }

}

const mapDispatch = dispatch => ({
  getSliderMenu: props => {

    //const action = creators.getMenus(props);
    const action = creators.queryMenuAction(props);
    dispatch(action);
  },
});

export default withRouter(connect(null, mapDispatch)(SideMenu));