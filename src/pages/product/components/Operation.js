import React from "react";
import { Button, Popconfirm, Icon, Switch } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import { withRouter, Link } from "react-router-dom";
import $$ from "static/js/base";
import * as config from "../config";

function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/product/add",
          state: {
            allProductType: props.allProductType,
            record: props.record
          }
        }}
      >
        <Button style={fontSmall} type="primary" size="small" ghost>
          修改
        </Button>
      </Link>
      &nbsp;&nbsp;
      <Switch
        checkedChildren="上架"
        unCheckedChildren="下架"
        defaultChecked={
          props.record.status === config.status.NORMAL ? true : false
        }
        onChange={checked => {
          const status = checked ? config.status.NORMAL : config.status.INVILD;
          const data = { status, productCode: props.record.productCode };
          props.setStatus({ props, data });
        }}
      />
      &nbsp;&nbsp;
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const userNo = $$.localStorage.get("adminId");
          const data = {
            userNo,
            productCode: props.record.productCode,
            status: "DEL"
          };
          props.deleteRow({ props, data });
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消"
      >
        <Button style={fontSmall} type="danger" size="small" ghost>
          删除
        </Button>
      </Popconfirm>
      &nbsp;&nbsp;
    </div>
  );
}

const mapState = state => ({
  allProductType: state.product.allProductType
});

const mapDispatch = dispatch => ({
  deleteRow: req => {
    const action = creators.deleteRowAction(req);
    dispatch(action);
  },
  setStatus: req => {
    const action = creators.setStatusAction(req);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Oper));
