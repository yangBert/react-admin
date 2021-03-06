import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px", marginBottom: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/account/add",
          state: {
            editRecord: props.record,
            editOrgList: props.editOrgList
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/account/recharge",
          state: {
            record: props.record
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          充值
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/rechargeRule/list",
          state: {
            accountCode: props.record.accountCode
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          配置
        </Button>
      </Link>
      <Link
        to={{
          pathname: "/account/detail",
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

const mapState = state => ({
  editOrgList: state.account.editOrgList
});

const mapDispatch = dispatch => ({
  // updateState: req => {
  //   const action = creators.updateStateAction(req);
  //   dispatch(action);
  // },
});

export default withRouter(connect(mapState, mapDispatch)(Oper));
