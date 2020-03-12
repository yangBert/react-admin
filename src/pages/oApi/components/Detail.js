import React from "react";
import { Card, Descriptions, Button, Divider, Collapse, Spin } from "antd";
import styles from "../css/detail.module.css";
import * as creators from "../store/creators";
import { connect } from "react-redux";
import * as config from "../config";

const { Panel } = Collapse;

class Detail extends React.Component {
  state = {
    activeKey: 0
  };
  componentDidMount() {
    const { apiId } = this.props.location.state.record;
    this.props.qeruyParamsDetail({
      props: this.props,
      data: { apiId }
    });
  }

  callback = activeKey => {
    console.log(activeKey);
    this.setState({ activeKey });
  };

  render() {
    if (this.props.location.state.record) {
      var {
        apiName,
        apiUrl,
        apiReqType,
        apiParamType,
        state,
        typeId,
        apiRemarks
      } = this.props.location.state.record;
    }

    return (
      <div>
        <div className={styles.pageContet}>
          <Spin tip="Loading..." spinning={this.props.spinning}>
            <div className="pageContentColor">
              <Card title="API基本信息" bordered={false}>
                <Descriptions>
                  <Descriptions.Item label="接口名称">
                    {apiName}
                  </Descriptions.Item>
                  <Descriptions.Item label="接口类型">
                    {typeId}
                  </Descriptions.Item>
                  <Descriptions.Item label="请求URL">
                    {apiUrl}
                  </Descriptions.Item>
                  <Descriptions.Item label="请求方法">
                    {apiReqType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Content-Type">
                    {apiParamType}
                  </Descriptions.Item>
                  <Descriptions.Item label="接口状态">
                    {state && config.state[state]}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions>
                  <Descriptions.Item label="描述">
                    {apiRemarks}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card title="参数信息" bordered={false}>
                <Collapse
                  accordion
                  activeKey={[this.state.activeKey]}
                  onChange={this.callback}
                >
                  {this.props.paramsDetail.map((item, index) => (
                    <Panel header={"参数" + (index + 1)} key={index}>
                      <Descriptions>
                        <Descriptions.Item label="参数名称">
                          {item.paramName}
                        </Descriptions.Item>
                        <Descriptions.Item label="参数类型">
                          {item.paramType}
                        </Descriptions.Item>
                        <Descriptions.Item label="是否必传">
                          {item.isNess}
                        </Descriptions.Item>
                        <Descriptions.Item label="状态">
                          {state && config.state[state]}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Descriptions.Item label="描述">
                          {item.paramRemarks}
                        </Descriptions.Item>
                      </Descriptions>
                      <Descriptions>
                        <Divider />
                      </Descriptions>
                    </Panel>
                  ))}
                </Collapse>
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
          </Spin>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  spinning: state.oApi.spinning,
  paramsDetail: state.oApi.paramsDetail
});

const mapDispatch = dispatch => ({
  qeruyParamsDetail: req => {
    const action = creators.qeruyParamsDetailAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Detail);
