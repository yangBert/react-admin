import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';
import * as config from '../config';

const { TextArea } = Input;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const { name, remarks } = this.props.location.state.editRecord
      this.setForm(name, remarks)
    } else {
      this.setForm("", "", "")
    }
  }

  setForm(name, remarks) {
    this.props.changeEditName(name)
    this.props.changeEeditRemarks(remarks)
  }

  save() {
    let { editName, editRemarks } = this.props;
    editName = $$.trim(editName)
    editRemarks = $$.trim(editRemarks)
    if (editName === "") {
      message.error('请输入角色名称');
      return
    } else if (editRemarks === "") {
      message.error('请输入角色备注');
      return
    }
    const req = {
      props: this.props,
      data: {
        name: editName,
        remarks: editRemarks,
      }
    }

    const editId = this.props.location.state && this.props.location.state.editRecord.id
    if (editId) {
      req.data.id = editId
    }
    console.log("data", req)
    this.props.save(req)
  }

  mapStatus() {
    let statusArr = [];
    Object.keys(config.status).forEach(k => {
      statusArr.push({ k, v: config.status[k] })
    })
    return statusArr;
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="新增角色" bordered={false}>
              <Form className={`${styles.form}`}>
                <div className={`${styles.formLine} clearfix`}><label className="pullLeft">角色名称：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入角色名称"
                      onChange={e => this.props.changeEditName(e.target.value)}
                      value={this.props.editName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} clearfix`}><label className="pullLeft">备注：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TextArea rows={4}
                      className={styles.text}
                      placeholder="备注"
                      onChange={e => this.props.changeEeditRemarks(e.target.value)}
                      value={this.props.editRemarks}
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
  spinning: state.tokenRole.spinning,
  editName: state.tokenRole.editName,
  editRemarks: state.tokenRole.editRemarks,
  saveLoading: state.tokenRole.saveLoading,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  changeEditName: value => {
    const action = creators.changeEditNameAction(value);
    dispatch(action);
  },
  changeEeditRemarks: value => {
    const action = creators.changeEeditRemarksAction(value);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(Add);