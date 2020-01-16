import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form, TreeSelect, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';

const { Option } = Select;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const {
        accountName,
        accountType,
        orgCode,
        parentAccount,
        accessScrect
      } = this.props.location.state.editRecord
      this.props.setAccountName(accountName)
      this.props.setEditAccountType(accountType)
      this.props.setEditOrgCode(orgCode)
      this.props.setEditParentAccount(parentAccount)
      this.props.setEditAccessScrect(accessScrect)
    }
  }

  save() {
    const {
      editAccountName,
      editAccountType,
      editOrgCode,
      editParentAccount,
      editAccessScrect
    } = this.props;
    if ($$.trim(editAccountName) === "") {
      message.error('请填写优惠策略');
      return
    } else if (editAccountType === "") {
      message.error('请选择账户类型');
      return
    } else if (editOrgCode === "") {
      message.error('请选择机构单位');
      return
    } else if ($$.trim(editParentAccount) === "") {
      message.error('请填写父账户');
      return
    } else if ($$.trim(editAccessScrect) === "") {
      message.error('请填写账户访问密钥');
      return
    }
    //const creater = $$.localStorage.get("adminId")
    const createrName = $$.localStorage.get("adminName")
    const req = {
      props: this.props,
      data: {
        accountName: $$.trim(editAccountName),
        accountType: editAccountType,
        orgCode: editOrgCode,
        parentAccount: $$.trim(editParentAccount),
        accessScrect: $$.trim(editAccessScrect),
        createdBy: createrName,
      }
    }

    const editId = this.props.location.state.editRecord && this.props.location.state.editRecord.id
    if (editId) {
      req.data.id = editId
    }
    console.log("idsdfsdfsdf", req)
    this.props.save(req)
  }

  //递归
  recursiveFn(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].title = arr[i].orgName
      arr[i].value = arr[i].orgCode
      if (arr[i].children && arr[i].children.length > 0) {
        this.recursiveFn(arr[i].children)
      }
    }
    return arr;
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">账户名称：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入账户名称"
                      onChange={e => this.props.setAccountName(e.target.value)}
                      value={this.props.editAccountName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">账户类型：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      value={this.props.editAccountType}
                      onChange={value => this.props.setEditAccountType(value)}
                    >
                      <Option value="">请选择</Option>
                      <Option value="01">个人账户</Option>
                      <Option value="02">企业账户</Option>
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">所属于单位：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TreeSelect
                      style={{ width: '100%' }}
                      value={this.props.editOrgCode}
                      dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                      treeData={this.recursiveFn(this.props.location.state.editOrgList)}
                      placeholder="请选择"
                      treeDefaultExpandAll
                      onChange={this.props.setEditOrgCode}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">父账户：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入父账户"
                      onChange={e => this.props.setEditParentAccount(e.target.value)}
                      value={this.props.editParentAccount}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">账户访问：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入账户访问"
                      onChange={e => this.props.setEditAccessScrect(e.target.value)}
                      value={this.props.editAccessScrect}
                    />
                  </div>
                </div>

              </Form>
            </Card>
          </div >

          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >保存</Button>
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.props.history.goBack()}
            >返回列表</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  spinning: state.account.spinning,
  editAccountName: state.account.editAccountName,
  saveLoading: state.account.saveLoading,
  editAccountType: state.account.editAccountType,
  editOrgCode: state.account.editOrgCode,
  editParentAccount: state.account.editParentAccount,
  editAccessScrect: state.account.editAccessScrect,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  setAccountName: value => {
    const action = creators.setAccountNameAction(value);
    dispatch(action);
  },
  setEditAccountType: value => {
    const action = creators.setEditAccountTypeAction(value);
    dispatch(action);
  },
  setEditOrgCode: value => {
    const action = creators.setEditOrgCodeAction(value);
    dispatch(action);
  },
  setEditParentAccount: value => {
    const action = creators.setEditParentAccountAction(value);
    dispatch(action);
  },
  setEditAccessScrect: value => {
    const action = creators.setEditAccessScrectAction(value);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Add);