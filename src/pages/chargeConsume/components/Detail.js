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
        productCode,
        preferentialMoney,
        consumeMoney,
        preferentialMoney,
        total,
        consumeTime,
        consumeDesc,
        appId
      } = this.props.detail;
    }

    return (
      <div>
        <div className={styles.pageContet}>
          <div className="pageContentColor">
            <Card title="消费详情" bordered={false}>
              <Descriptions>
                <Descriptions.Item label="账户编码">
                  {accountCode}
                </Descriptions.Item>
                <Descriptions.Item label="产品">
                  {productCode}
                </Descriptions.Item>
                <Descriptions.Item label="消费金额">
                  {consumeMoney && consumeMoney.toFixed(2)} 元
                </Descriptions.Item>
                <Descriptions.Item label="优惠金额">
                  {preferentialMoney && preferentialMoney.toFixed(2)} 元
                </Descriptions.Item>
                <Descriptions.Item label="合计消费金额">
                  {total && total.toFixed(2)} 元
                </Descriptions.Item>

                <Descriptions.Item label="消费时间">
                  {$$.getHours(consumeTime)}
                </Descriptions.Item>
                <Descriptions.Item label="应用">{appId}</Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="描述">
                  {consumeDesc}
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
  detail: state.chargeConsume.detail
});

const mapDispatch = dispatch => ({
  qeruyDetail: req => {
    const action = creators.qeruyDetailAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Detail);
