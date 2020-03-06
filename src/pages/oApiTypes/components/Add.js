import React from 'react';
import { Modal, Input, Form, Select } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import * as config from '../config';
import $$ from 'static/js/base';

const { TextArea } = Input;
const { Option } = Select;

function Add(props) {

  function collectData() {
    let { typeName, typeRemarks, state } = props.record
    typeName = $$.trim(typeName)
    typeRemarks = $$.trim(typeRemarks)
    if (typeName === '') {
      Modal.error({
        title: '类型名称',
        content: "不能为空",
        okText: '确认',
      });
      return
    } else if (typeRemarks === '') {
      Modal.error({
        title: '类型备注',
        content: "不能为空",
        okText: '确认',
      });
      return
    }
    let data = {
      typeName,
      typeRemarks,
    }
    if (props.edit) {
      data.id = props.record.id
      data.state = state
    }
    const req = { props, data }
    props.save(req)
  }

  function mapStatus() {
    let statusArr = [];
    Object.keys(config.status).forEach(k => {
      statusArr.push({ k, v: config.status[k] })
    })
    return statusArr;
  }


  return (
    <div className={styles.tableForm}>
      <Modal
        title={props.record ? "修改" : "新增"}
        width={600}
        style={{ top: 20 }}
        visible={props.modalVisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        confirmLoading={props.confirmLoading}
        onCancel={() => props.changeModalVisible(false, false, config.record)}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">类型名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => props.changeTypeName(e.target.value)}
                value={props.record.typeName} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">类型备注：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TextArea
                rows={4}
                value={props.record.typeRemarks}
                onChange={e => props.changeTypeRemarks(e.target.value)}
              />
            </div>
          </div>

          {
            props.edit ?
              <div className={`${styles.formLine} clearfix`}>
                <label className="pullLeft">安全策略状态：</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select
                    value={props.record.strategyStatus}
                    style={{ width: "100%" }}
                    onChange={value => props.changeStrategyStatus(value)}>
                    <Option value="">请选择</Option>
                    {
                      mapStatus().map(item => {
                        return <Option value={item.k} key={item.k}>{item.v}</Option>
                      })
                    }
                  </Select>
                </div>
              </div> : ""
          }
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  modalVisible: state.oApiTypes.modalVisible,
  record: state.oApiTypes.record,
  spinning: state.oApiTypes.spinning,
  confirmLoading: state.oApiTypes.confirmLoading,
  edit: state.oApiTypes.edit,
})

const mapDispatch = dispatch => ({
  changeModalVisible: (modalVisible, edit, record) => {
    const action = creators.changeModalVisibleAction(modalVisible, edit, record);
    dispatch(action);
  },
  changeTypeName: value => {
    const action = creators.changeTypeNameAction(value);
    dispatch(action);
  },
  changeTypeRemarks: value => {
    const action = creators.changeTypeRemarksAction(value);
    dispatch(action);
  },
  changeStrategyStatus: value => {
    const action = creators.changeStrategyStatusAction(value);
    dispatch(action);
  },
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Add);
