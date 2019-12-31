import React, { Component } from 'react';
import { Spin, Input, Button, message, Select, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import * as enumerate from 'static/js/enumerate';

const { Option } = Select;

class CertificationAdd extends Component {
  componentDidMount() {
    if (this.props.location.state) {
      const { authName, url, authStyle, authLevel, status } = this.props.location.state.editRecord
      this.props.onChangeAuthName(authName)
      this.props.onChangeEditURL(url)
      this.props.onChangeAuthLevel(authLevel)
      this.props.onChangeAuthStyle(authStyle)
      this.props.onChangeEditStatus(status)
    } else {
      this.props.cleanForm()
    }
  }

  save() {
    const {
      editAuthName,
      editURL,
      editAuthLevel,
      editAuthStyle,
      editStatus
    } = this.props;
    if ($$.trim(editAuthName) === "") {
      message.error('请填写认证源名称');
      return
    } else if ($$.trim(editURL) === "") {
      message.error('请填写认证接入URL');
      return
    } if ($$.trim(editAuthLevel) === "") {
      message.error('请选择认证等级');
      return
    } if ($$.trim(editAuthStyle) === "") {
      message.error('请选择认证源接口方式');
      return
    } if ($$.trim(editStatus) === "") {
      message.error('请选择状态');
      return
    }
    const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        authName: $$.trim(editAuthName),
        url: $$.trim(editURL),
        authLevel: editAuthLevel,
        authStyle: $$.trim(editAuthStyle),
        status: $$.trim(editStatus),
        userNo
      }
    }

    const authCode = this.props.location.state && this.props.location.state.editRecord.authCode
    if (authCode) {
      req.data.authCode = authCode
    }

    this.props.saveForm(req)
  }

  initAuthStyle() {
    const t = enumerate.interfaceTypes.data
    return t.map(item => <Option key={item} value={item}>{enumerate.interfaceTypes.get(item)}</Option>)
  }

  initStatus() {
    const t = enumerate.baseState.data
    return t.map(item => <Option key={item} value={item}>{enumerate.baseState.get(item)}</Option>)
  }

  initAuthLevel() {
    const t = enumerate.authSafety.data
    return t.map(item => <Option key={item} value={item}>{enumerate.authSafety.get(item)}</Option>)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">认证源名称:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      allowClear
                      onChange={e => this.props.onChangeAuthName(e.target.value)}
                      value={this.props.editAuthName}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">认证接入URL:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      allowClear
                      onChange={e => this.props.onChangeEditURL(e.target.value)}
                      value={this.props.editURL}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">认证等级:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      style={{ width: "100%" }}
                      onChange={value => this.props.onChangeAuthLevel(value)}
                      value={this.props.editAuthLevel}
                    >
                      <Option value="">请选择</Option>
                      {this.initAuthLevel()}
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">认证源接口方式:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      style={{ width: "100%" }}
                      onChange={value => this.props.onChangeAuthStyle(value)}
                      value={this.props.editAuthStyle}
                    >
                      <Option value="">请选择</Option>
                      {this.initAuthStyle()}
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">认证源状态:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      style={{ width: "100%" }}
                      onChange={value => this.props.onChangeEditStatus(value)}
                      value={this.props.editStatus}
                    >
                      <Option value="">请选择</Option>
                      {this.initStatus()}
                    </Select>
                  </div>
                </div>
              </Form>
            </Card>

          </div>
          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.button}
              onClick={() => this.save()}
            >保存</Button>
            <Link to="/certification/list">
              <Button
                size="large"
                type="primary"
                className={styles.button}
              >返回列表</Button>
            </Link>

          </div>
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  spinning: state.certification.spinning,
  editAuthName: state.certification.editAuthName,
  editURL: state.certification.editURL,
  editAuthLevel: state.certification.editAuthLevel,
  editAuthStyle: state.certification.editAuthStyle,
  editStatus: state.certification.editStatus,
})

const mapDispatch = dispatch => ({
  saveForm: req => {
    const action = creators.createSaveFormAction(req);
    dispatch(action);
  },
  onChangeAuthName: req => {
    const action = creators.changeAuthNameAction(req);
    dispatch(action);
  },
  onChangeEditURL: req => {
    const action = creators.changeEditURLAction(req);
    dispatch(action);
  },
  onChangeAuthLevel: req => {
    const action = creators.changeAuthLevelAction(req);
    dispatch(action);
  },
  onChangeAuthStyle: req => {
    const action = creators.changeAuthStyleAction(req);
    dispatch(action);
  },
  onChangeEditStatus: req => {
    const action = creators.changeEditStatusAction(req);
    dispatch(action);
  },
  cleanForm: () => {
    const action = creators.cleanFormAction();
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(CertificationAdd);