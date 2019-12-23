import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Select } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';
const { Option } = Select;

const { TextArea } = Input;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [typeCode, setTypeCode] = useState("")
  const [dataName, setDataName] = useState("")
  const [remarks, setRemarks] = useState("")

  const [refTypeCode, setRefTypeCode] = useState(null)
  const [refDataName, setRefDataName] = useState(null)
  const [refRemarks, setRefRemarks] = useState(null)


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $typeCode = $operationType === "edit" ? props.record.type : ""
  const $dataName = $operationType === "edit" ? props.record.name : ""
  const $remarks = $operationType === "edit" ? props.record.remarks : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setTypeCode($typeCode);
    setDataName($dataName);
    setRemarks($remarks);
  }, [$addModalvisible, $operationType, $typeCode, $dataName, $remarks]);


  //新增管理员提交数据
  function collectData() {
    if (typeCode === "") {
      refTypeCode.focus()
      return;
    } else if (dataName === "") {
      refDataName.focus()
      return;
    } else if (remarks === "") {
      refRemarks.focus()
      return;
    }
    const data = {
      type: typeCode,
      name: dataName,
      remarks,
    }
    if ($operationType === "edit") {
      data.code = props.record.code
    }
    const type = $operationType === "edit"
    props.addDictData({ props, data, type })
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title="编辑字典数据"
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
              <Select value={typeCode}
                style={{ width: "100%" }}
                onChange={value => setTypeCode(value)}
                ref={select => setRefTypeCode(select)}
              >
                <Option value="">请选择类型</Option>
                {
                  props.typeList ?
                    props.typeList.map(item => <Option key={item.type} value={item.type}>{item.typeName}</Option>) :
                    ""
                }
              </Select>

            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">数据名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefDataName(input)}
                onChange={e => setDataName(e.target.value)}
                value={dataName} />
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
  addModalvisible: state.dictData.addModalvisible,
  operationType: state.dictData.operationType,
  record: state.dictData.record,
  ConfirmLoading: state.dictData.ConfirmLoading,
  typeList: state.dictData.typeList,
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  addDictData: req => {
    const action = creators.createAddAction(req);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(AddModal));
