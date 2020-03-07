import React, { useState } from "react";
import { Modal, Input } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import $$ from "static/js/base";
import { withRouter } from "react-router-dom";

const { TextArea } = Input;

function ModalConfirm(props) {
  const [task, setTask] = useState("");

  function handleSave() {
    const userNo = $$.localStorage.get("adminId");
    const req = {
      props,
      data: {
        userNo,
        status: "false",
        task,
        instanceCode: props.location.state.record.instanceCode
      }
    };
    props.save(req);
  }

  function oncancel() {
    props.changeConfirmVisible(false);
    props.changeConfirmVisible(false);
  }

  return (
    <div>
      <Modal
        title="审核不通过"
        visible={props.confirmVisible}
        onOk={() => handleSave()}
        onCancel={() => oncancel()}
        okText="确认"
        cancelText="取消"
        confirmLoading={props.confirmLoading}
      >
        <TextArea
          placeholder="请输入审核不通过原因"
          onChange={e => setTask(e.target.value)}
          value={task}
          rows={4}
        />
      </Modal>
    </div>
  );
}

const mapState = state => ({
  saveLoading: state.applyOrder.saveLoading,
  confirmVisible: state.applyOrder.confirmVisible,
  confirmLoading: state.applyOrder.confirmLoading
});

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.auditAction(req);
    dispatch(action);
  },
  changeConfirmVisible: value => {
    const action = creators.changeConfirmVisibleAction(value);
    dispatch(action);
  },
  changeConfirmVisible: value => {
    const action = creators.changeConfirmVisibleAction(value);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(ModalConfirm));
