import React, { useState, useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


const { TextArea } = Input;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [typeName, setTypeName] = useState("")
  const [remarks, setRemarks] = useState("")


  const [refTypeName, setRefTypeName] = useState(null)
  const [refRemarks, setRefRemarks] = useState(null)


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $typeName = $operationType === "edit" ? props.record.typeName : ""
  const $remarks = $operationType === "edit" ? props.record.remarks : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setTypeName($typeName);
    setRemarks($remarks);
  }, [$addModalvisible, $operationType, $typeName, $remarks]);


  //新增管理员提交数据
  function collectData() {
    if (typeName === "") {
      refTypeName.focus()
      return;
    } else if (remarks === "") {
      refRemarks.focus()
      return;
    }
    const data = {
      typeName,
      remarks,
    }
    if ($operationType === "edit") {
      data.type = props.record.type
    }
    const type = $operationType === "edit"
    props.addUser({ props, data, type })
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title="编辑字典类型"
        width={600}
        style={{ top: 20 }}
        confirmLoading={props.ConfirmLoading}
        visible={addModalvisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        onCancel={() => props.changeAddModalvisible(false, "", {})}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">类型名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefTypeName(input)}
                onChange={e => setTypeName(e.target.value)}
                value={typeName} />
            </div>
          </div>

          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">备注：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TextArea rows={4}
                ref={input => setRefRemarks(input)}
                onChange={e => setRemarks(e.target.value)}
                value={remarks}
              />
            </div>
          </div>
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  addModalvisible: state.dictType.addModalvisible,
  operationType: state.dictType.operationType,
  record: state.dictType.record,
  ConfirmLoading: state.dictType.ConfirmLoading
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  addUser: req => {
    const action = creators.createAddAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(AddModal);
