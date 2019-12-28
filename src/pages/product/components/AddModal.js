import React, { useState, useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';
import $$ from 'static/js/base';

const { TextArea } = Input;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [productName, setProductName] = useState("")
  const [productDesc, setProductDesc] = useState("")

  const [refProductName, setRefProductName] = useState(null)
  const [refProductDesc, setRefProductDesc] = useState(null)


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $productName = $operationType === "edit" ? props.record.productName : ""
  const $productDesc = $operationType === "edit" ? props.record.productDesc : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setProductName($productName);
    setProductDesc($productDesc);
  }, [$addModalvisible, $operationType, $productName, $productDesc]);


  //新增管理员提交数据
  function collectData() {
    if ($$.trim(productName) === "") {
      refProductName.focus()
      return;
    } else if ($$.trim(productDesc) === "") {
      refProductDesc.focus()
      return;
    }
    const userNo = $$.localStorage.get("adminId")
    const data = {
      productName: $$.trim(productName),
      productDesc: $$.trim(productDesc),
      userNo
    }
    if ($operationType === "edit") {
      data.productCode = props.record.productCode
    }
    const type = $operationType === "edit"
    props.addDictData({ props, data, type })
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title="编辑产品"
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
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">产品名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefProductName(input)}
                onChange={e => setProductName(e.target.value)}
                value={productName} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">产品描述：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TextArea rows={4}
                ref={input => setRefProductDesc(input)}
                onChange={e => setProductDesc(e.target.value)}
                value={productDesc}
              />
            </div>
          </div>
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  addModalvisible: state.product.addModalvisible,
  operationType: state.product.operationType,
  record: state.product.record,
  ConfirmLoading: state.product.ConfirmLoading,
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
