import React, { Component } from "react";
import { Spin, Input, Button, message, Select, Card } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/add.module.css";
import $$ from "static/js/base";
import * as config from "../config";

const { Option } = Select;
const { TextArea } = Input;

class Add extends Component {
  componentDidMount() {
    this.props.queryTypeList({ props: this.props, data: {} });
    if (this.props.location.state) {
      const {
        apiName,
        typeId,
        apiReqType,
        apiUrl,
        apiParamType,
        apiRemarks
      } = this.props.location.state.record;
      this.props.setApiName(apiName);
      this.props.setTypeId(typeId);
      this.props.setApiReqType(apiReqType);
      this.props.setApiParamType(apiParamType);
      this.props.setApiRemarks(apiRemarks);
      this.props.setApiUrl(apiUrl);
    }
  }

  save() {
    const {
      apiName,
      typeId,
      apiReqType,
      apiUrl,
      apiParamType,
      apiRemarks
    } = this.props;
    if ($$.trim(apiName) === "") {
      message.error("请输入接口名称");
      return;
    } else if (typeId === "") {
      message.error("请选择接口类型");
      return;
    } else if (apiReqType === "") {
      message.error("请选择请求类型");
      return;
    } else if (apiParamType === "") {
      message.error("请选择参数类型");
      return;
    } else if ($$.trim(apiUrl) === "") {
      message.error("请输入接口URL");
      return;
    } else if ($$.trim(apiRemarks) === "") {
      message.error("请输入接口备注信息");
      return;
    }

    const req = {
      props: this.props,
      data: {
        apiName: $$.trim(apiName),
        typeId,
        apiReqType,
        apiUrl: $$.trim(apiUrl),
        apiParamType,
        apiRemarks: $$.trim(apiRemarks),
        state: "NORMAL"
      }
    };
    if (this.props.location.state) {
      req.data.apiId = this.props.location.state.record.apiId;
    }
    this.props.save(req);
  }

  render() {
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <Card title="新增" bordered={false}>
            <div className="clearfix">
              <div className={`${styles.form} pullLeft`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">接口类型:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      value={this.props.typeId}
                      style={{ width: "100%" }}
                      onChange={value => this.props.setTypeId(value)}
                    >
                      <Option value="">请选择</Option>
                      {this.props.typeList.map(item => (
                        <Option value={item.typeId} key={item.typeId}>
                          {item.typeName}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">接口名称:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Input
                    placeholder="请输入接口名称"
                    allowClear
                    onChange={e => this.props.setApiName(e.target.value)}
                    value={this.props.apiName}
                  />
                </div>
              </div>
            </div>
            <div className="clearfix">
              <div className={`${styles.form} pullLeft`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">请求类型:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      value={this.props.apiReqType}
                      style={{ width: "100%" }}
                      onChange={value => this.props.setApiReqType(value)}
                    >
                      <Option value="">请选择</Option>
                      {config.apiReqType.map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">接口URL:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Input
                    placeholder="请输入接口URL"
                    allowClear
                    onChange={e => this.props.setApiUrl(e.target.value)}
                    value={this.props.apiUrl}
                  />
                </div>
              </div>
            </div>
            <div className="clearfix">
              <div className={`${styles.form} pullLeft`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">Content-Type:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      value={this.props.apiParamType}
                      style={{ width: "100%" }}
                      onChange={value => this.props.setApiParamType(value)}
                    >
                      <Option value="">请选择</Option>
                      {config.apiParamType.map(item => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">接口备注:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <TextArea
                    rows={4}
                    value={this.props.apiRemarks}
                    onChange={e => this.props.setApiRemarks(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <Button
                type="primary"
                className={`${styles.button}`}
                onClick={() => this.save()}
                size="large"
              >
                保存
              </Button>
              <Button
                className={`${styles.button}`}
                onClick={() => this.props.history.goBack()}
                size="large"
              >
                返回
              </Button>
            </div>
          </Card>
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  spinning: state.oApi.spinning,
  typeList: state.oApi.typeList,
  apiName: state.oApi.apiName,
  typeId: state.oApi.typeId,
  apiReqType: state.oApi.apiReqType,
  apiUrl: state.oApi.apiUrl,
  apiParamType: state.oApi.apiParamType,
  apiRemarks: state.oApi.apiRemarks
});

const mapDispatch = dispatch => ({
  setApiName: req => {
    const action = creators.setApiNameAction(req);
    dispatch(action);
  },
  setTypeId: req => {
    const action = creators.setTypeIdAction(req);
    dispatch(action);
  },
  queryTypeList: req => {
    const action = creators.queryTypeListAction(req);
    dispatch(action);
  },
  setApiReqType: req => {
    const action = creators.setApiReqTypeAction(req);
    dispatch(action);
  },
  setApiUrl: req => {
    const action = creators.setApiUrlAction(req);
    dispatch(action);
  },
  setApiParamType: req => {
    const action = creators.setApiParamTypeAction(req);
    dispatch(action);
  },
  setApiRemarks: req => {
    const action = creators.setApiRemarksAction(req);
    dispatch(action);
  },
  save: req => {
    const action = creators.createSaveAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Add);
