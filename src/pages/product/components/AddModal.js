import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, message, TreeSelect, Select } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';
import $$ from 'static/js/base';
import * as config from '../config';

const { TextArea } = Input;
const { Option } = Select;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [productTypeCode, setProductTypeCode] = useState("")
  const [productName, setProductName] = useState("")
  const [productDesc, setProductDesc] = useState("")
  const [status, setStatus] = useState("")

  const [refProductName, setRefProductName] = useState(null)
  const [refProductDesc, setRefProductDesc] = useState(null)


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible

  const $productTypeCode = $operationType === "edit" ? props.record.productTypeCode : ""
  const $productName = $operationType === "edit" ? props.record.productName : ""
  const $productDesc = $operationType === "edit" ? props.record.productDesc : ""
  const $status = $operationType === "edit" ? props.record.status : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setProductTypeCode($productTypeCode)
    setProductName($productName)
    setProductDesc($productDesc)
    setStatus($status)
  }, [
    $addModalvisible,
    $operationType,
    $productTypeCode,
    $productName,
    $productDesc,
    $status
  ]);


  //新增管理员提交数据
  function collectData() {
    if (productTypeCode === "") {
      message.error('请选择产品类型');
      return;
    } else if ($$.trim(productName) === "") {
      refProductName.focus()
      return;
    } else if ($$.trim(productDesc) === "") {
      refProductDesc.focus()
      return;
    }
    const userNo = $$.localStorage.get("adminId")
    const data = {
      productTypeCode: productTypeCode,
      productName: $$.trim(productName),
      productDesc: $$.trim(productDesc),
      userNo
    }
    if ($operationType === "edit") {
      data.productCode = props.record.productCode
      data.status = status
    }
    const type = $operationType === "edit"
    props.addDictData({ props, data, type })
  }

  //递归
  function recursiveFn(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].title = arr[i].productTypeName
      arr[i].value = arr[i].productTypeCode
      if (arr[i].children && arr[i].children.length > 0) {
        recursiveFn(arr[i].children)
      }
    }
    return arr;
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
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">产品类型：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TreeSelect
                style={{ width: '100%' }}
                value={productTypeCode}
                dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                treeData={recursiveFn(props.allProductType)}
                placeholder="请选择"
                //treeDefaultExpandAll
                onChange={value => setProductTypeCode(value)}
              />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}>
            <label className="pullLeft">产品名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefProductName(input)}
                onChange={e => setProductName(e.target.value)}
                value={productName} />
            </div>
          </div>
          {
            props.operationType === 'edit' ?

              <div className={`${styles.formLine} clearfix`}>
                <label className="pullLeft">产品状态：</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
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
  allProductType: state.product.allProductType,
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
