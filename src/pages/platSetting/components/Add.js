import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';

class Add extends Component {
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.editRecord) {
        const { settingExp, settingKey, settingValue } = this.props.location.state.editRecord
        this.props.onChangeSettingExp(settingExp)
        this.props.onChangeSettingKey(settingKey)
        this.props.onChangeSettingValue(settingValue)
      } else {
        this.props.onChangeSettingExp("")
        this.props.onChangeSettingKey("")
        this.props.onChangeSettingValue("")
      }
    }
  }

  save() {
    const {
      editSettingExp,
      editSettingKey,
      editSettingValue
    } = this.props;
    if ($$.trim(editSettingExp) === "") {
      message.error('请填写配置项名称');
      return
    } else if ($$.trim(editSettingKey) === "") {
      message.error('请填写配置项字段');
      return
    } else if ($$.trim(editSettingValue) === "") {
      message.error('请填写配置项值');
      return
    }
    //const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        settingExp: $$.trim(editSettingExp),
        settingKey: $$.trim(editSettingKey),
        settingValue: $$.trim(editSettingValue),
      }
    }

    const id = this.props.location.state.editRecord && this.props.location.state.editRecord.id
    if (id) {
      req.data.id = id
    }

    this.props.saveForm(req)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card
              title={this.props.location.state && this.props.location.state.editRecord ? "修改" : "新增"}
              bordered={false}>
              <Form className={`${styles.form} clearfix`}>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">配置项名称:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入配置项名称"
                      allowClear
                      onChange={e => this.props.onChangeSettingExp(e.target.value)}
                      value={this.props.editSettingExp}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">配置项字段:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入配置项字段"
                      disabled={(this.props.location.state && this.props.location.state.editRecord) ? true : false}
                      allowClear
                      onChange={e => this.props.onChangeSettingKey(e.target.value)}
                      value={this.props.editSettingKey}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">配置项值:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      placeholder="请输入配置项值"
                      allowClear
                      onChange={e => this.props.onChangeSettingValue(e.target.value)}
                      value={this.props.editSettingValue}
                    />
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
            <Link to="/platSetting/list">
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
  spinning: state.platSetting.spinning,
  editSettingExp: state.platSetting.editSettingExp,
  editSettingKey: state.platSetting.editSettingKey,
  editSettingValue: state.platSetting.editSettingValue,
})

const mapDispatch = dispatch => ({
  onChangeSettingExp: value => {
    const action = creators.onChangeSettingExpAction(value);
    dispatch(action);
  },
  onChangeSettingKey: value => {
    const action = creators.onChangeSettingKeyAction(value);
    dispatch(action);
  },
  onChangeSettingValue: value => {
    const action = creators.onChangeSettingValueAction(value);
    dispatch(action);
  },
  saveForm: value => {
    const action = creators.saveFormAction(value);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Add);