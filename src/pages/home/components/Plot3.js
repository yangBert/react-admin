import React, { Component } from "react";
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from "../style.module.css";

class Plot3 extends Component {
  componentDidMount() {
    this.props.queryPlot3({
      component: this,
      props: this.props,
      data: {}
    });
  }

  render() {
    return (
      <div className={`${styles.item} pullLeft`}>
        <div id="plot3"></div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  queryPlot3: req => {
    const action = creators.queryPlot3Action(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Plot3);