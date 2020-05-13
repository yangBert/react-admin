import React, { Component } from 'react';
import SideMenuUI from './SideMenuUI';
import { connect } from 'react-redux';
import * as creators from 'pages/common/menu/store/creators';
import { withRouter } from 'react-router';

class SideMenu extends Component {
  componentDidMount() {
    this.props.getSliderMenu({ props: this.props, data: {} });
  }
  render() {
    return <SideMenuUI />
  }
}

const mapDispatch = dispatch => ({
  getSliderMenu: props => {
    const action = creators.queryMenuAction(props);
    dispatch(action);
  },
});

export default withRouter(connect(null, mapDispatch)(SideMenu));