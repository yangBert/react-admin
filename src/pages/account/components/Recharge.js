import React, { Component } from "react";
import {
  Spin,
  Input,
  Button,
  message,
  Select,
  Card,
  Form,
  InputNumber
} from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/add.module.css";
import $$ from "static/js/base";
import * as config from "../config";

const { Option } = Select;

class Recharge extends Component {
  componentDidMount() {
    const { accountType } = this.props.location.state.record;
    this.props.setRechargeType(accountType);
  }

  save() {
    const { accountCode } = this.props.location.state.record;
    const { rechargeType, rechargeMoney } = this.props;
    if (!accountCode) {
      message.error("账户有误，请核实！");
      return;
    } else if (rechargeType === "") {
      message.error("请选择请充值类型");
      return;
    } else if (rechargeMoney === 0) {
      message.error("请输入充值金额");
      return;
    }
    const req = {
      props: this.props,
      data: {
        accountCode,
        rechargeType,
        rechargeMoney
      }
    };

    this.props.reCharge(req);
  }

  render() {
    const { accountCode, accountName } = this.props.location.state.record;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Card title="充值" bordered={false}>
          <Form className={`${styles.form} clearfix`}>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">账户名称：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input disabled={true} value={accountName} />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">账户编码：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input disabled={true} value={accountCode} />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">充值类型：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={this.props.rechargeType}
                  disabled={true}
                  style={{ width: "100%" }}
                >
                  <Option value="">请选择</Option>
                  {config.rechargeType.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">充值金额：</label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                  step={10}
                  value={this.props.rechargeMoney}
                  onChange={value => this.props.setRechargeMoney(value)}
                />
              </div>
            </div>
          </Form>
          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >
              保存
            </Button>
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.props.history.goBack()}
            >
              返回列表
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapState = state => ({
  rechargeType: state.account.rechargeType,
  rechargeMoney: state.account.rechargeMoney
});

const mapDispatch = dispatch => ({
  setRechargeType: req => {
    const action = creators.setRechargeTypeAction(req);
    dispatch(action);
  },
  setRechargeMoney: req => {
    const action = creators.setRechargeMoneyAction(req);
    dispatch(action);
  },
  reCharge: req => {
    const action = creators.reChargeAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Recharge);
