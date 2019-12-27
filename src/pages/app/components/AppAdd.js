import React, { Component } from 'react';
import { Card, Form, Input, Upload, Icon, message, Select, Checkbox, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from '../css/add.module.css';
import * as creators from '../store/creators';
//import $$ from 'static/js/base';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('请上传 JPG/PNG 文件!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('图片必须小于 2M!');
//   }
//   return isJpgOrPng && isLt2M;
// }


class AppAdd extends Component {

  state = {
    loading: false,
    refappName: null,
    refurl: null,
    refdescribes: null,
    refredirectUrl: null,
    refappType: null,
    refauditMode: null,
  };

  componentDidMount() {
    //查询应用所有信息
    if (this.props.location.state && this.props.location.state.editAppId) {
      this.props.queryEditAppInfor({ com: this, data: { id: this.props.location.state.editAppId } })
    } else {
      this.props.emptyValue()
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, icon =>
        this.setState({
          icon,
          loading: false,
        }),
      );
    }
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于 2M!');
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var self = this;
    reader.onload = function () {
      self.props.setIconBase64(this.result)
      //self.props.onChangeIcon(file)
      self.setState({ icon: file })
    }
    return isJpgOrPng && isLt2M;
  }

  collectFormData() {
    const data = this.props.form
    const imgURL = this.props.iconBase64 || this.props.icon
    const file = this.state.icon
    const {
      appName,
      url,
      describes,
      redirectUrl,
      appType,
      auditMode,
      landingModes,
      supportCAs
    } = data

    if (appName === "") {
      message.error("应用名称不能为空")
      return;
    } else if (url === "") {
      message.error("应用访问地址不能为空")
      return;
    } else if (describes === "") {
      message.error("应用描述不能为空")
      return;
    } else if (redirectUrl === "") {
      message.error("推送URL不能为空")
      return;
    } else if (!imgURL) {
      message.error("请上传应用LOGO")
      return;
    } else if (appType === "") {
      message.error("请选择应用类型")
      return;
    } else if (auditMode === "") {
      message.error("请选择审核模式")
      return;
    } else if (landingModes.length === 0) {
      message.error("请选择登陆认证方式")
      return;
    } else if (supportCAs.length === 0) {
      message.error("请选择支持CA机构")
      return;
    }

    var formDatas = new FormData();
    formDatas.append("file", file);
    formDatas.append("appName", data.appName);
    formDatas.append("url", data.url);
    formDatas.append("describes", data.describes);
    formDatas.append("redirectUrl", data.redirectUrl);
    formDatas.append("appType", data.appType);
    formDatas.append("auditMode", data.auditMode);
    formDatas.append("landingModes", data.landingModes);
    formDatas.append("supportCAs", data.supportCAs);
    if (this.props.location.state && this.props.location.state.editAppId) {
      formDatas.append("id", this.props.location.state.editAppId);
    }
    this.props.saveAppForm({ props: this.props, data: formDatas })
  }

  backButton() {
    this.props.history.goBack()
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const imgURL = this.props.iconBase64 || this.props.icon
    return (
      <div className={styles.pageContet}>
        {/* <h3 className={styles.childTitle}>新增</h3> */}
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">应用名称：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入应用名称"
                      //ref={refappName => this.setState({refappName})}
                      onChange={e => this.props.onChangeAppName(e.target.value)}
                      value={this.props.appName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">应用访问地址：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入应用访问地址"
                      //ref={refurl => this.setState({ refurl })}
                      onChange={e => this.props.onChangeUrl(e.target.value)}
                      value={this.props.url}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">应用描述：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入应用描述"
                      //ref={refdescribes => this.setState({refdescribes})}
                      onChange={e => this.props.onChangeDescribes(e.target.value)}
                      value={this.props.describes}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">推送URL：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入推送URL"
                      //ref={refredirectUrl => this.setState({refredirectUrl})}
                      onChange={e => this.props.onChangeRedirectUrl(e.target.value)}
                      value={this.props.redirectUrl}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">上传应用LOGO：</label>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    //action={requestURL.uploadUploadApplyFile}
                    beforeUpload={this.beforeUpload}
                  //onChange={this.props.onChangeIcon}
                  >
                    {
                      imgURL ?
                        <img src={imgURL} alt="avatar" style={{ width: '100%' }} /> :
                        uploadButton
                    }
                  </Upload>
                </div>
              </Form>
            </Card>
          </div >

          <div className="pageContentColor">
            <Card title="扩展信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">应用类型：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      //ref={refappType => this.setState({refappType})}
                      value={this.props.appType ? this.props.appType : ""}
                      onChange={value => this.props.onChangeAppType(value)}
                    >
                      <Option value="">请选择</Option>
                      {
                        this.props.allAppTypes && this.props.allAppTypes.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)
                      }
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">审核模式：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      //ref={refauditMode => this.setState({refauditMode})}
                      value={this.props.auditMode === "" ? "" : this.props.auditMode}
                      onChange={value => this.props.onChangeAuditMode(value)}
                    >
                      <Option value="">请选择</Option>
                      <Option value={0}>接入应用自主审核</Option>
                      <Option value={1}>自动审核通过</Option>
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formLine} clearfix`}><label className="pullLeft">登陆认证方式：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Checkbox.Group

                      options={this.props.allLandingModes}
                      value={this.props.landingModes}
                      onChange={this.props.changeLandingModes}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} clearfix`}><label className="pullLeft">支持CA机构：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Checkbox.Group

                      options={this.props.allSupportCAs}
                      value={this.props.supportCAs}
                      onChange={this.props.onChangeSupportCAs}
                    />
                  </div>
                </div>
              </Form>
            </Card>
          </div >
          <div className={styles.formButton}>
            {this.props.editAppId ? "" :
              <Button
                type="primary"
                size="large"
                className={styles.formbtn}
                onClick={() => this.collectFormData()}
                loading={this.props.saveLoading}
              >保存</Button>
            }
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.backButton()}
            >返回列表</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  appName: state.app.form.appName,
  url: state.app.form.url,
  describes: state.app.form.describes,
  redirectUrl: state.app.form.redirectUrl,
  icon: state.app.form.icon,
  appType: state.app.form.appType,
  auditMode: state.app.form.auditMode,
  landingModes: state.app.form.landingModes,
  supportCAs: state.app.form.supportCAs,
  allLandingModes: state.app.form.allLandingModes,
  allSupportCAs: state.app.form.allSupportCAs,
  allAppTypes: state.app.form.allAppTypes,
  iconBase64: state.app.iconBase64,
  form: state.app.form,
  saveLoading: state.app.saveLoading,
  editAppId: state.app.editAppId,
  spinning: state.app.spinning,
})

const mapDispatch = dispatch => ({
  onChangeAppName: value => {
    const action = creators.onChangeAppNameAction(value);
    dispatch(action);
  },
  onChangeUrl: value => {
    const action = creators.onChangeUrlAction(value);
    dispatch(action);
  },
  onChangeDescribes: value => {
    const action = creators.onChangeDescribesAction(value);
    dispatch(action);
  },
  onChangeRedirectUrl: value => {
    const action = creators.onChangeRedirectUrlAction(value);
    dispatch(action);
  },
  onChangeIcon: value => {
    const action = creators.onChangeIconAction(value);
    dispatch(action);
  },
  onChangeAppType: value => {
    const action = creators.onChangeAppTypeAction(value);
    dispatch(action);
  },
  onChangeAuditMode: value => {
    const action = creators.onChangeAuditModeAction(value);
    dispatch(action);
  },
  changeLandingModes: value => {
    const action = creators.changeLandingModesAction(value);
    dispatch(action);
  },
  onChangeSupportCAs: value => {
    const action = creators.onChangeSupportCAsAction(value);
    dispatch(action);
  },

  setIconBase64: value => {
    const action = creators.setIconBase64Action(value);
    dispatch(action);
  },
  saveAppForm: value => {
    const action = creators.saveAppFormAction(value);
    dispatch(action);
  },
  queryEditAppInfor: value => {
    const action = creators.queryEditAppAction(value);
    dispatch(action);
  },
  emptyValue: () => {
    const action = creators.emptyAddValueAction();
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(AppAdd));