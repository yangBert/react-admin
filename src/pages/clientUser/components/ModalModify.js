import React, { useState, useEffect } from 'react';
import { Modal, Select, Form } from 'antd';
import * as config from '../config';
import styles from '../css/operation.module.css';
import $$ from 'static/js/base';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const { Option } = Select;

function ModalModify(props) {

  function submitOk() {
    const operUserNo = $$.localStorage.get("adminId")
    props.update({
      props,
      data: { status: props.editStatus, userNo: props.record.userNo, operUserNo }
    })
  }
  return <Modal
    title="修改用户状态"
    width={600}
    visible={props.modalVisible}
    cancelText="取消"
    okText="确定"
    onOk={() => submitOk()}
    confirmLoading={props.spinning}
    onCancel={() => props.changeModalVisible(false)}
  >
    <Form>
      <div className={`${styles.formLine} clearfix`}><label className="pullLeft">请选择状态：</label>
        <div className={`${styles.inline} pullLeft`}>
          <Select value={props.editStatus} style={{ width: "100%" }} onChange={value => props.setStatus(value)}>
            <Option value="">请选择</Option>
            {
              config.statusMap.map(item => {
                return <Option value={item.value} key={item.value}>{item.name}</Option>
              })
            }
          </Select>
        </div>
      </div>
    </Form>
  </Modal>
}

const mapState = state => ({
  modalVisible: state.clientUser.modalVisible,
  spinning: state.clientUser.spinning,
  record: state.clientUser.record,
  editStatus: state.clientUser.editStatus,
})

const mapDispatch = dispatch => ({
  changeModalVisible: (visible, editStatus) => {
    const action = creators.changeModalVisibleAction(visible, editStatus);
    dispatch(action);
  },
  update: req => {
    const action = creators.updateAction(req);
    dispatch(action);
  },
  setStatus: req => {
    const action = creators.setStatusAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(ModalModify));