import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot5 extends Component {
  componentDidMount() {
    this.props.queryPlot5({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot5"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot5: req => {
    const action = creators.queryPlot5Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot5);