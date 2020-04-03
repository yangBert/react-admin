import React from "react";
import { Button, Popconfirm } from "antd";
import { withRouter, Link } from "react-router-dom";
import $$ from 'static/js/base';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  function confirm() {
    const userNo = $$.localStorage.get("adminId")
    const { id, accountCode, productCode, rechargeId, preferentialId } = props.record
    props.unBind({
      props,
      data: { id, accountCode, productCode, rechargeId, preferentialId, userNo }
    })
  }
  return (
    <div>
      <Popconfirm placement="left" title="确定解除该配置吗？" onConfirm={() => confirm()} okText="确定" cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>
          解除绑定
        </Button>
      </Popconfirm>
    </div>
  );
}

const mapDispatch = dispatch => ({
  unBind: req => {
    const action = creators.unBindRechargeRuleAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(Oper));
