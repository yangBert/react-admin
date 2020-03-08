import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as creators from "../store/creators";

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginRight: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/oApiParams/list",
          state: { record: props.record }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          参数
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/oApi/add",
          state: { record: props.record }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/question/add",
          state: { record: props.record }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          详情
        </Button>
      </Link>
    </div>
  );
}

const mapDispatch = dispatch => ({
  // publishNotice: req => {
  //   const action = creators.publishNoticeAction(req);
  //   dispatch(action);
  // }
});

export default connect(null, mapDispatch)(Oper);
