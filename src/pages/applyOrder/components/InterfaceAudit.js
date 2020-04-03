import React, { Fragment } from "react";
import { Card, Descriptions, Button, Checkbox } from "antd";
import styles from "../css/detail.module.css";
import $$ from "static/js/base";
import * as creators from "../store/creators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as config from "../config";
import "react-photo-view/dist/index.css";
import ModalConfirm from "./ModalConfirm";

class Detail extends React.Component {
  componentDidMount() {
    const instanceCode = this.props.location.state.record.instanceCode;
    this.props.getDetail({
      props: this.props,
      data: { instanceCode }
    });
    //查询所有登陆认证方式
    this.props.queryLoginType({ props: this.props, data: {} });

    //查询所有的应用类型
    this.props.queryAllAppType({ props: this.props, data: {} });

    //查询所有支持CA机构
    this.props.queryAllSupportCAs({ props: this.props, data: {} });

    this.props.getFileList({ props: this.props, data: { instanceCode } });
  }
  audit(status) {
    if (!status) {
    } else {
      const userNo = $$.localStorage.get("adminId");
      this.props.audit({
        props: this.props,
        data: {
          instanceCode: this.props.location.state.record.instanceCode,
          status,
          userNo
        }
      });
    }
  }

  getNumbers(type) {
    const list = this.props.applyGetFileList;
    for (let i = 0; i < list.length; i++) {
      if (type === list[i].bussinessType) {
        return true;
      }
    }
    return false;
  }

  mapProductList(a) {
    let r = [];
    for (let i = 0; i < a.length; i++) {
      r.push({
        label: a[i].productName,
        value: a[i].productCode
      })
    }
    return r;
  }

  render() {
    if (this.props.detail) {
      var {
        instanceCode,
        status,
        createTime,
        totalSum,
        payTime,
        userNo,
        instanceType,
        paySum,
        finishTime,
        lastUpdateTime,
        contactPhone,
        contactName,
        code,
        remark,
      } = this.props.detail;
      if (this.props.detail.applyDetailRes) {
        var {
          ifcCode
        } = this.props.detail.applyDetailRes;
        if (ifcCode) {
          ifcCode = ifcCode.substring(0, ifcCode.length - 1);
          ifcCode = ifcCode.split(";");
        }
      }
    }
    const { catalog } = this.props;
    return (
      <div>
        <div className={styles.pageContet}>
          {this.props.detail ? (
            <div className="pageContentColor">
              <Card title="基本信息" bordered={false}>
                <Descriptions>
                  <Descriptions.Item label="订单号">
                    {instanceCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="订单状态">
                    {config.status.get(status)}
                  </Descriptions.Item>
                  <Descriptions.Item label="订单提交日期">
                    {createTime ? $$.getHours(createTime) : "--"}
                  </Descriptions.Item>
                  <Descriptions.Item label="订单总金额">
                    {totalSum}
                  </Descriptions.Item>
                  <Descriptions.Item label="支付时间">
                    {payTime ? $$.getHours(payTime) : "--"}
                  </Descriptions.Item>
                  <Descriptions.Item label="用户编码">
                    {userNo}
                  </Descriptions.Item>

                  <Descriptions.Item label="订单类型">
                    {config.instanceType[instanceType]}
                  </Descriptions.Item>
                  <Descriptions.Item label="支付金额">
                    {paySum}
                  </Descriptions.Item>
                  <Descriptions.Item label="结束时间">
                    {finishTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="最后更新时间">
                    {lastUpdateTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="支付时间">
                    {payTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系人手机号">
                    {contactPhone}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系人">
                    {contactName}
                  </Descriptions.Item>
                  <Descriptions.Item label="等级编码">{code}</Descriptions.Item>
                  <Descriptions.Item label="备注">{remark}</Descriptions.Item>
                </Descriptions>
                <br />
              </Card>
              <Card title="扩展信息" bordered={false}>
                {catalog.map(item => {
                  let options;
                  if (item.productList) {
                    options = this.mapProductList(item.productList)
                  }
                  return (
                    <div key={item.productTypeCode}>
                      <p className={styles.productTypeName}>{item.productTypeName}</p>
                      <div>
                        <Checkbox.Group style={{ lineHeight: 2.5 }} onChange={null} options={options} value={ifcCode} />
                      </div>
                    </div>
                  )
                })}
              </Card>
            </div>
          ) : (
              ""
            )}
          <div className={styles.bottom}>
            <ModalConfirm />
            {!this.props.location.state.allStatus && status === config.status.PRE_BUSSINESS_AUDIT
              ? (
                <Fragment>
                  <Button
                    type="primary"
                    onClick={() => this.audit("true")}
                    size="large"
                    className={styles.button}
                  >
                    审核通过
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => this.audit("false")}
                    size="large"
                    className={styles.button}
                  >
                    审核不通过
                  </Button>
                </Fragment>
              ) : (
                ""
              )}
            <Button
              type="primary"
              onClick={() => this.props.history.goBack()}
              size="large"
              className={styles.button}
            >
              返回
              </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  spinning: state.applyOrder.spinning,
  detail: state.applyOrder.detail,
  allAppTypes: state.applyOrder.allAppTypes,
  allLandingModes: state.applyOrder.allLandingModes,
  allSupportCAs: state.applyOrder.allSupportCAs,
  applyGetFileList: state.applyOrder.applyGetFileList,
  catalog: state.applyOrder.catalog,
});

const mapDispatch = dispatch => ({
  getDetail: req => {
    const action = creators.getDetailAction(req);
    dispatch(action);
  },
  audit: req => {
    const action = creators.auditAction(req);
    dispatch(action);
  },
  queryLoginType: req => {
    const action = creators.queryLoginTypeAction(req);
    dispatch(action);
  },
  queryAllAppType: req => {
    const action = creators.queryAllAppTypeAction(req);
    dispatch(action);
  },
  queryAllSupportCAs: value => {
    const action = creators.queryAllSupportCAsAction(value);
    dispatch(action);
  },
  getFileList: value => {
    const action = creators.applyGetFileListAction(value);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Detail));
