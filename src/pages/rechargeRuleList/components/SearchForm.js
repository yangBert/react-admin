import React from "react";
import { Button, Icon } from "antd";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

function SearchForm(props) {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div className="clearfix">
          <Link
            to={{
              pathname: "/rechargeRule/add",
              state: { accountCode: props.location.state.accountCode }
            }}
          >
            <Button type="primary" ghost>
              <Icon type="plus" />
              新增
            </Button>
          </Link>
          &nbsp;&nbsp;
          <Link
            to={{
              pathname: "/account/list"
            }}
          >
            <Button type="primary" ghost>
              <Icon type="rollback" />
              返回
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default withRouter(SearchForm);
