import React from "react";
import { Button } from "antd";
import { withRouter, Link } from "react-router-dom";

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginRight: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/oApiParams/add",
          state: {
            apiId: props.location.state.record.apiId,
            record: props.record
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/oApiParams/detail",
          state: {
            apiId: props.location.state.record.apiId,
            record: props.record
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          详情
        </Button>
      </Link>
    </div>
  );
}

export default withRouter(Oper);
