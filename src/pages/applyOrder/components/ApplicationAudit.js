import React, { Fragment } from "react";
import {
  Card,
  Descriptions,
  Button,
  Select,
  Checkbox,
  Radio,
  Divider,
  Spin
} from "antd";
import styles from "../css/detail.module.css";
import $$ from "static/js/base";
import * as creators from "../store/creators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as config from "../config";
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import "react-photo-view/dist/index.css";
import ModalConfirm from "./ModalConfirm";

const { Option } = Select;
function stringTorNumber(arr) {
  let a = [];
  for (let i = 0; i < arr.length; i++) {
    a.push(Number(arr[i]));
  }
  return a;
}

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
    if (status === "false") {
      this.props.changeConfirmVisible(true);
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

  getImageURL(type) {
    const list = this.props.applyGetFileList;
    for (let i = 0; i < list.length; i++) {
      if (type === list[i].bussinessType) {
        return list[i].fileUrl;
      }
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

  getFileList(item, code, name) {
    if (item.bussinessType === code) {
      return (
        <PhotoConsumer
          key={item.fileCode}
          src={item.fileUrl}
          intro={name}
        >
          <img
            src={item.fileUrl}
            alt={name}
            className={styles.listImg}
          />
        </PhotoConsumer>
      );
    }
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
        remark
      } = this.props.detail;
      if (this.props.detail.applyDetailRes) {
        var {
          appType,
          landingModes,
          feeCode,
          supportCAs,
          appName,
          url,
          redirectUrl,
          describes
        } = this.props.detail.applyDetailRes;
        landingModes = landingModes.substring(0, landingModes.length - 1);
        landingModes = stringTorNumber(landingModes.split(";"));
        supportCAs = supportCAs.substring(0, supportCAs.length - 1);
        supportCAs = stringTorNumber(supportCAs.split(";"));
      }

    }
    return (
      <div>
        <div className={styles.pageContet}>
          <Spin tip="Loading..." spinning={this.props.spinning}>
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
                    <Descriptions.Item label="备注">{remark}</Descriptions.Item>
                  </Descriptions>
                  <Divider />
                  <Descriptions>
                    <Descriptions.Item label="应用名称">
                      {appName}
                    </Descriptions.Item>
                    <Descriptions.Item label="应用访问URL">
                      {url}
                    </Descriptions.Item>
                    <Descriptions.Item label="推送URL">
                      {redirectUrl}
                    </Descriptions.Item>
                  </Descriptions>
                  {this.getNumbers(config.image.LOGO.code) ? (
                    <div>
                      <p>应用LOGO：</p>
                      <PhotoProvider>
                        <PhotoConsumer
                          src={this.getImageURL(config.image.LOGO.code)}
                          intro={appName}
                        >
                          <img
                            src={this.getImageURL(config.image.LOGO.code)}
                            alt="应用LOGO"
                            className={styles.logo}
                            style={{ marginLeft: "30px" }}
                          />
                        </PhotoConsumer>
                      </PhotoProvider>
                    </div>
                  ) : (
                      ""
                    )}

                  <br />
                  <div>
                    <p>应用描述：</p>
                    <div>{describes}</div>
                  </div>
                </Card>
                <Card title="扩展信息" bordered={false}>
                  <Descriptions>
                    <Descriptions.Item label="应用类型">
                      <Select onChange={null} value={appType}>
                        <Option value="">未定义</Option>
                        {this.props.allAppTypes.map(item => (
                          <Option key={item.value} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Descriptions.Item>

                    <Descriptions.Item label="登录方式">
                      <Checkbox.Group
                        options={this.props.allLandingModes}
                        onChange={null}
                        value={landingModes}
                      />
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions>
                    <Descriptions.Item label="登录方式">
                      <Radio.Group value={feeCode} onChange={null}>
                        <Radio value={"1"}>一次性收费</Radio>
                        <Radio value={"0"}>实时收费</Radio>
                      </Radio.Group>
                    </Descriptions.Item>
                    <Descriptions.Item label="支持CA">
                      <Checkbox.Group
                        onChange={null}
                        options={this.props.allSupportCAs}
                        value={supportCAs}
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
                <Card title="证明材料" bordered={false}>
                  {this.getNumbers(config.image.BL.code) ? (
                    <div>
                      <p>{config.image.BL.name}</p>
                      <div>
                        <PhotoProvider>
                          {this.props.applyGetFileList.map(item => (
                            this.getFileList(item, config.image.BL.code, config.image.BL.name)
                          ))}
                        </PhotoProvider>
                      </div>
                    </div>
                  ) : (
                      ""
                    )}
                  {this.getNumbers(config.image.SYS.code) ? (
                    <div>
                      <p>{config.image.SYS.name}</p>
                      <div>
                        <PhotoProvider>
                          {this.props.applyGetFileList.map(item => (
                            this.getFileList(item, config.image.SYS.code, config.image.SYS.name)
                          ))}
                        </PhotoProvider>
                      </div>
                    </div>
                  ) : (
                      ""
                    )}
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
          </Spin>
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
  applyGetFileList: state.applyOrder.applyGetFileList
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
  },
  changeConfirmVisible: value => {
    const action = creators.changeConfirmVisibleAction(value);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(Detail));
