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
      const { title, url, remarks } = this.props.location.state.editRecord
      this.setForm(title, url, remarks)
    } else {
      this.setForm("", "", "")
    }
  }

  setForm(title, url, remarks) {
    this.props.onChangeEditTitle(title)
    this.props.onChangeEditURL(url)
    this.props.onChangeEeditRemarks(remarks)
  }

  save() {
    const { editTitle, editURL, editRemarks } = this.props;
    if ($$.trim(editTitle) === "") {
      message.error('请输入接口标题');
      return
    } else if ($$.trim(editURL) === "") {
      message.error('请输入接口');
      return
    } else if ($$.trim(editRemarks) === "") {
      message.error('请输入接口备注');
      return
    }
    const req = {
      props: this.props,
      data: {
        title: $$.trim(editTitle),
        url: $$.trim(editURL),
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
            <Card title="新增接口" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">接口标题：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="接口标题"
                      onChange={e => this.props.onChangeEditTitle(e.target.value)}
                      value={this.props.editTitle}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">接口：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="“/api/-xx/base/**”"
                      onChange={e => this.props.onChangeEditURL(e.target.value)}
                      value={this.props.editURL}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">接口备注：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TextArea rows={4}
                      className={styles.text}
                      placeholder="接口备注"
                      onChange={e => this.props.onChangeEeditRemarks(e.target.value)}
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
  spinning: state.tokenPower.spinning,
  editTitle: state.tokenPower.editTitle,
  editURL: state.tokenPower.editURL,
  editRemarks: state.tokenPower.editRemarks,
  status: state.tokenPower.editStatus,
  saveLoading: state.tokenPower.saveLoading,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  onChangeEditTitle: value => {
    const action = creators.onChangeEditTitleAction(value);
    dispatch(action);
  },
  onChangeEditURL: value => {
    const action = creators.onChangeEditURLAction(value);
    dispatch(action);
  },
  onChangeEeditRemarks: value => {
    const action = creators.onChangeEeditRemarksAction(value);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(Add);