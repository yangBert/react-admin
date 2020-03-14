import React from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };

  function link(pathname) {
    const o = {
      pathname,
      state: { record: props.record, allStatus: true }
    };
    props.history.push(o);
  }

  function switchType() {
    const instanceType = props.record.instanceType;
    switch (instanceType) {
      case "APPLICATION":
        link("/applyOrder/application/audit");
        break;
      case "CA":
        link("/applyOrder/ca/audit");
        break;
      case "INTERFACE":
        link("/applyOrder/interface/audit");
        break;
      case "ORG":
        link("/applyOrder/org/audit");
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Button
        onClick={() => switchType()}
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      >
        详情
      </Button>
    </div>
  );
}

export default withRouter(Oper);
