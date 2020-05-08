import React from "react";
import { Button, Popconfirm } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/chargeConfig/add",
          state: {
            appCode: props.location.state.appCode,
            record: props.record
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          props.delChargeConfig({
            props,
            data: props.record
          })
        }}>
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >删除</Button>
      </Popconfirm>

    </div>
  );
}

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  delChargeConfig: record => {
    const action = creators.delChargeConfigAction(record);
    dispatch(action);
  }
})

export default withRouter(connect(null, mapDispatch)(Oper));
