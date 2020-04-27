import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot7 extends Component {
  componentDidMount() {
    this.props.queryPlot7({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot7"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot7: req => {
    const action = creators.queryPlot7Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot7);