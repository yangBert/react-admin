import React from "react";
import { Card, Descriptions, Button } from "antd";
import styles from "../css/detail.module.css";
import * as creators from "../store/creators";
import { connect } from "react-redux";
import * as config from "../config";
import $$ from "static/js/base";

class Detail extends React.Component {
  componentDidMount() {
    const { id } = this.props.location.state.record;
    this.props.qeruyDetail({
      props: this.props,
      data: { id }
    });
  }
  render() {
    if (this.props.detail) {
      var {
        accountCode,
        rechargeMoney,
        rechargeType,
        rechargeTime
      } = this.props.detail;
    }

    return (
      <div>
        <div className={styles.pageContet}>
          <div className="pageContentColor">
            <Card title="充值详情" bordered={false}>
              <Descriptions>
                <Descriptions.Item label="账户编码">
                  {accountCode}
                </Descriptions.Item>
                <Descriptions.Item label="账户类型">
                  {config.rechargeType[rechargeType]
                    ? config.rechargeType[rechargeType]
                    : "--"}
                </Descriptions.Item>
                <Descriptions.Item label="充值时间">
                  {$$.getHours(rechargeTime)}
                </Descriptions.Item>
                <Descriptions.Item label="充值金额">
                  {rechargeMoney && rechargeMoney.toFixed(2)}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
          <div className={styles.bottom}>
            <Button
              type="primary"
              className={styles.back}
              onClick={() => this.props.history.goBack()}
              size="large"
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
  detail: state.chargeRecharge.detail
});

const mapDispatch = dispatch => ({
  qeruyDetail: req => {
    const action = creators.qeruyDetailAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Detail);
