import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';

const { TextArea } = Input;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const { strategyName, strategyDesc } = this.props.location.state.editRecord
      this.props.onChangeEditStrategyName(strategyName)
      this.props.onChangeStrategyDesc(strategyDesc)
    }
  }

  save() {
    const { editStrategyName, editStrategyDesc } = this.props;
    if ($$.trim(editStrategyName) === "") {
      message.error('请填写优惠策略');
      return
    } else if ($$.trim(editStrategyDesc) === "") {
      message.error('请填写描述');
      return
    }
    //const creater = $$.localStorage.get("adminId")
    const createrName = $$.localStorage.get("adminName")
    const req = {
      props: this.props,
      data: {
        strategyName: $$.trim(editStrategyName),
        strategyDesc: $$.trim(editStrategyDesc),
        createdBy: createrName
      }
    }

    const editId = this.props.location.state && this.props.location.state.editRecord.id
    if (editId) {
      req.data.id = editId
    }
    console.log("idsdfsdfsdf", req)
    this.props.save(req)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="基本信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">优惠策略：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="请输入优惠策略"
                      onChange={e => this.props.onChangeEditStrategyName(e.target.value)}
                      value={this.props.editStrategyName}
                    />
                  </div>
                </div>
                {/* <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">金额（元）：</label>
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
                </div> */}
                {/* <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">优惠策略类型：</label>
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
                </div> */}
                <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">描述：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TextArea
                      rows={10}
                      value={this.props.editStrategyDesc}
                      onChange={e => this.props.onChangeStrategyDesc(e.target.value)}
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
  spinning: state.preferential.spinning,
  editStrategyName: state.preferential.editStrategyName,
  editStrategyDesc: state.preferential.editStrategyDesc,
  saveLoading: state.preferential.saveLoading,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  onChangeEditStrategyName: value => {
    const action = creators.onChangeEditStrategyNameAction(value);
    dispatch(action);
  },
  onChangeStrategyDesc: value => {
    const action = creators.onChangeStrategyDescAction(value);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(Add);