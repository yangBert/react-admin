import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot2 extends Component {
  componentDidMount() {
    this.props.queryPlot2({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return <div id="plot2" className={`${styles.item} pullLeft`}></div>

  }
}

const mapDispatch = dispatch => ({
  queryPlot2: req => {
    const action = creators.queryPlot2Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot2);