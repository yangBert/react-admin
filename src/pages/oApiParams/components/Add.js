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
    // this.props.queryTypeList({ props: this.props, data: {} });
    // if (this.props.location.state) {
    //   const {
    //     apiName,
    //     typeId,
    //     apiReqType,
    //     apiUrl,
    //     apiParamType,
    //     apiRemarks
    //   } = this.props.location.state.record;
    //   this.props.setApiName(apiName);
    //   this.props.setTypeId(typeId);
    //   this.props.setApiReqType(apiReqType);
    //   this.props.setApiParamType(apiParamType);
    //   this.props.setApiRemarks(apiRemarks);
    //   this.props.setApiUrl(apiUrl);
    // }
  }

  save() {
    const { paramName, paramType, isNess, paramRemarks } = this.props;
    if ($$.trim(paramName) === "") {
      message.error("请输入参数名称");
      return;
    } else if (paramType === "") {
      message.error("请选择参数类型");
      return;
    } else if (isNess === "") {
      message.error("请选择是否必传");
      return;
    } else if ($$.trim(paramRemarks) === "") {
      message.error("请输入备注信息");
      return;
    }
    const req = {
      props: this.props,
      data: {
        apiId: this.props.location.state.apiId,
        paramName: $$.trim(paramName),
        paramType,
        isNess,
        paramRemarks: $$.trim(paramRemarks),
        state: "NORMAL"
      }
    };
    if (this.props.location.state && this.props.location.state.record) {
      req.data.paramId = this.props.location.state.record.paramId;
    }
    console.log("req", req);
    this.props.save(req);
  }

  render() {
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <Card title="新增" bordered={false}>
            <div className="clearfix">
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">参数名称：</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Input
                    placeholder="请输入参数名称"
                    allowClear
                    onChange={e => this.props.setParamName(e.target.value)}
                    value={this.props.paramName}
                  />
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">接口类型:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select
                    value={this.props.paramType}
                    style={{ width: "100%" }}
                    onChange={value => this.props.setParamType(value)}
                  >
                    <Option value="">请选择</Option>
                    {config.paramType.map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            <div className="clearfix">
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">是否必传:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select
                    value={this.props.isNess}
                    style={{ width: "100%" }}
                    onChange={value => this.props.setIsNess(value)}
                  >
                    <Option value="">请选择</Option>
                    <Option value="1">是</Option>
                    <Option value="2">否</Option>
                  </Select>
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">接口备注:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <TextArea
                    rows={4}
                    value={this.props.paramRemarks}
                    onChange={e => this.props.setParamRemarks(e.target.value)}
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
  spinning: state.oApiParams.spinning,
  paramName: state.oApiParams.paramName,
  paramType: state.oApiParams.paramType,
  isNess: state.oApiParams.isNess,
  paramRemarks: state.oApiParams.paramRemarks
});

const mapDispatch = dispatch => ({
  setParamName: req => {
    const action = creators.setParamNameAction(req);
    dispatch(action);
  },
  setParamType: req => {
    const action = creators.setParamTypeAction(req);
    dispatch(action);
  },
  setIsNess: req => {
    const action = creators.setIsNessAction(req);
    dispatch(action);
  },
  setParamRemarks: req => {
    const action = creators.setParamRemarksAction(req);
    dispatch(action);
  },
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Add);
