import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot1 extends Component {
  componentDidMount() {
    this.props.queryPlot1({
      props: this.props,
      data: {}
    });
  }
  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot1"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot1: req => {
    const action = creators.queryPlot1Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot1);