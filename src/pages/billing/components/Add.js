import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form, InputNumber, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';

const { Option } = Select;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const { title, amount, type } = this.props.location.state.editRecord
      this.props.onChangeEditTitle(title)
      this.props.onChangeEditAmount(amount)
      this.props.onChangeEditType(type)
    }
  }

  save() {
    const { editTitle, editAmount, editType } = this.props;
    if ($$.trim(editTitle) === "") {
      message.error('请填写计费策略');
      return
    } else if (!editAmount) {
      message.error('请填计费金额');
      return
    } else if ($$.trim(editType) === "") {
      message.error('请选择计费类型');
      return
    }
    const creater = $$.localStorage.get("adminId")
    //const createrName = $$.localStorage.get("adminName")
    const req = {
      props: this.props,
      data: {
        title: editTitle,
        amount: Number(editAmount.toFixed(2)),
        type: editType,
        createdBy: creater
      }
    }

    const editId = this.props.location.state && this.props.location.state.id
    if (editId) {
      req.data.id = editId
    }
    this.props.save(req)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">计费策略：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入计费策略"
                      onChange={e => this.props.onChangeEditTitle(e.target.value)}
                      value={this.props.editTitle}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">金额（元）：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      precision={2}
                      step={10}
                      value={this.props.editAmount}
                      onChange={value => this.props.onChangeEditAmount(value)}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">计费类型：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      value={this.props.editType}
                      onChange={value => this.props.onChangeEditType(value)}
                    >
                      <Option value="">请选择</Option>
                      <Option value="1">按次</Option>
                      <Option value="2">包次</Option>
                    </Select>
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
  spinning: state.billing.spinning,
  editTitle: state.billing.editTitle,
  editAmount: state.billing.editAmount,
  editType: state.billing.editType,
  saveLoading: state.billing.saveLoading,
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
  onChangeEditAmount: value => {
    const action = creators.onChangeEditAmountAction(value);
    dispatch(action);
  },
  onChangeEditType: value => {
    const action = creators.onChangeEditTypeAction(value);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(Add);