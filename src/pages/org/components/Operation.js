import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Button } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";

function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/org/orgAdd",
          state: { record: props.record, list: props.list }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
    </div>
  );
}

const mapState = state => ({
  list: state.org.list
});

const mapDispatch = dispatch => ({
  updateOrgUpdate: req => {
    const action = creators.updateOrgUpdateAction(req);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Oper));
