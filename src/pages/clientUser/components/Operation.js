import React from 'react';
import { Button, Modal, Select, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';
import * as config from '../config';
import styles from '../css/operation.module.css';
import $$ from 'static/js/base';

const { Option } = Select

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };

  function submitOk() {
    const operUserNo = $$.localStorage.get("adminId")
    props.update({
      props,
      data: { status: props.editStatus, userNo: props.record.userNo, operUserNo }
    })
  }
  return (
    <div>
      <Modal
        title="修改用户状态"
        width={600}
        style={{ top: 20 }}
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
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
        onClick={() => props.changeModalVisible(true, props.editStatus)}
      >修改</Button>
      <Link
        to={{
          pathname: "/clientUser/detail",
          state: { record: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >详情</Button>
      </Link>
    </div >
  )
}

const mapState = state => ({
  modalVisible: state.clientUser.modalVisible,
  editStatus: state.clientUser.editStatus,
  spinning: state.clientUser.spinning,
})

const mapDispatch = dispatch => ({
  setStatus: req => {
    const action = creators.setStatusAction(req);
    dispatch(action);
  },
  changeModalVisible: (visible, editStatus) => {
    const action = creators.changeModalVisibleAction(visible, editStatus);
    dispatch(action);
  },
  update: req => {
    const action = creators.updateAction(req);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(Oper));
