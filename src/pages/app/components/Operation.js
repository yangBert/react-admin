import React from "react";
import { Switch, Button } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import { withRouter, Link } from "react-router-dom";

function Oper(props) {
  return (
    <div>
      <Link
        to={{
          pathname: "/app/appList/add",
          state: {
            editAppId: props.record.id,
            allLandingModes: props.allLandingModes,
            allSupportCAs: props.allSupportCAs,
            allAppTypes: props.allAppTypes,
            allAuthLevel: props.allAuthLevel
          }
        }}
      >
        <Button style={{ fontSize: "12px" }} type="primary" size="small" ghost>
          修改
        </Button>
        &nbsp;&nbsp;
      </Link>
      <Switch
        checkedChildren="上线"
        unCheckedChildren="下线"
        defaultChecked={props.record.appStatus === 1 ? true : false}
        onChange={checked => {
          const appStatus = checked ? 1 : 2;
          const data = new FormData();
          data.append("appStatus", appStatus);
          data.append("id", props.record.id);
          props.changeAppStatus({ props, data });
        }}
      />&nbsp;&nbsp;
      {
        props.record.auditStatus === 1 ?
          <Button
            onClick={() =>
              props.showSecret({ props, data: "appID=" + props.record.id })
            }
            style={{ fontSize: "12px" }}
            type="primary"
            size="small"
            ghost
          >密钥</Button> : ""
      }
      &nbsp;&nbsp;
      <Link
        to={{
          pathname: "/chargeConfig/list",
          state: {
            appCode: props.record.appCode
          }
        }}
      >
        <Button style={{ fontSize: "12px" }} type="primary" size="small" ghost>
          配置
        </Button>
        &nbsp;&nbsp;
      </Link>
    </div >
  );
}

const mapState = state => ({
  params: state.app.params,
  allLandingModes: state.app.form.allLandingModes,
  allSupportCAs: state.app.form.allSupportCAs,
  allAppTypes: state.app.form.allAppTypes,
  allAuthLevel: state.app.form.allAuthLevel,
  allProductType: state.app.allProductType
});

const mapDispatch = dispatch => ({
  changeAppStatus: req => {
    const action = creators.createChangeAppStatusAction(req);
    dispatch(action);
  },
  showSecret: req => {
    const action = creators.showSecretAction(req);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Oper));
