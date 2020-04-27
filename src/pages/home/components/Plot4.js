import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot4 extends Component {
  componentDidMount() {
    this.props.queryPlot4({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot4"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot4: req => {
    const action = creators.queryPlot4Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot4);