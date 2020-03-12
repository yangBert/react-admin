import React, { Component } from "react";
import { Spin, Input, Button, message, Form, Card, TreeSelect } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/add.module.css";
import $$ from "static/js/base";

const { TextArea } = Input;

class OrgAdd extends Component {
  componentDidMount() {
    const list = this.props.location.state && this.props.location.state.list;
    if (list) {
      this.props.initTree(list);
    }
    const record =
      this.props.location.state && this.props.location.state.record;
    if (record) {
      this.props.initValues(record);
    }
  }
  backButton() {
    this.props.history.goBack();
  }
  submit() {
    const { editOrgName, editOrgCode, editOrgDesc } = this.props;
    if ($$.trim(editOrgName) === "") {
      message.error("请填写机构名称");
      return;
    } else if ($$.trim(editOrgCode) === "") {
      message.error("请填机构编码");
      return;
    } else if ($$.trim(editOrgDesc) === "") {
      message.error("请填机构描述");
      return;
    }
    const userNo = $$.localStorage.get("adminId");
    const req = {
      props: this.props,
      data: {
        orgName: $$.trim(editOrgName),
        orgCode: $$.trim(editOrgCode),
        orgDesc: $$.trim(editOrgDesc),
        userNo,
        porgCode: this.props.editPorgCode,
        pid: this.props.editPid
      }
    };

    const editId = this.props.editId;
    if (editId) {
      req.data.id = editId;
    }
    this.props.save(req);
  }

  onChangeTreeSelect = (value, label, extra) => {
    this.props.setTreeValue(extra.triggerNode.props);
  };

  render() {
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">请选上级择机构：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TreeSelect
                      style={{ width: "100%" }}
                      value={this.props.editPorgCode}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      treeData={this.props.treeList}
                      placeholder="请选择机构"
                      treeDefaultExpandAll
                      onChange={this.onChangeTreeSelect}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">机构名称：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入机构名称"
                      onChange={e => this.props.setOrgName(e.target.value)}
                      value={this.props.editOrgName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">机构编码：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入机构编码"
                      //ref={refurl => this.setState({ refurl })}
                      onChange={e => this.props.setOrgCode(e.target.value)}
                      value={this.props.editOrgCode}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">机构描述：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TextArea
                      placeholder="请输入机构描述"
                      value={this.props.editOrgDesc}
                      onChange={e => this.props.setOrgDesc(e.target.value)}
                      rows={2}
                    ></TextArea>
                  </div>
                </div>
              </Form>
            </Card>
          </div>

          <div className={styles.formButton}>
            {this.props.editAppId ? (
              ""
            ) : (
              <Button
                type="primary"
                size="large"
                className={styles.formbtn}
                onClick={() => this.submit()}
                loading={this.props.saveLoading}
              >
                保存
              </Button>
            )}
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.backButton()}
            >
              返回列表
            </Button>
          </div>
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  saveLoading: state.org.saveLoading,
  spinning: state.org.spinning,
  editPid: state.org.editPid,
  editPorgCode: state.org.editPorgCode,
  editParentOrgName: state.org.editParentOrgName,
  editOrgName: state.org.editOrgName,
  editOrgCode: state.org.editOrgCode,
  editOrgDesc: state.org.editOrgDesc,
  editId: state.org.editId,
  treeList: state.org.treeList
});

const mapDispatch = dispatch => ({
  setTreeValue: req => {
    const action = creators.setTreeValueAction(req);
    dispatch(action);
  },
  setOrgName: req => {
    const action = creators.setOrgNameAction(req);
    dispatch(action);
  },
  setOrgCode: req => {
    const action = creators.setOrgCodeAction(req);
    dispatch(action);
  },
  setOrgDesc: req => {
    const action = creators.setOrgDescAction(req);
    dispatch(action);
  },
  save: req => {
    const action = creators.createAddOrgAction(req);
    dispatch(action);
  },
  initValues: req => {
    const action = creators.initValuesAction(req);
    dispatch(action);
  },
  initTree: req => {
    const action = creators.initTreeAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(OrgAdd);
