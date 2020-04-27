import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot6 extends Component {
  componentDidMount() {
    this.props.queryPlot6({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot6"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot6: req => {
    const action = creators.queryPlot6Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot6);