import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, TreeSelect } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Edit(props) {
  const list = props.list
  const [pid, setPid] = useState("")
  const [productTypeName, setProductTypeName] = useState("")

  const [refProductTypeName, setRefProductTypeName] = useState(null)

  const $productTypeName = props.editRecord && props.editRecord.productTypeName
  const $pid = props.editRecord && props.editRecord.pid
  const productTypeCode = props.editRecord && props.editRecord.productTypeCode

  useEffect(() => {
    setProductTypeName($productTypeName)
    setPid($pid)
  }, [$productTypeName, $pid]);

  //修改提交数据
  function collectData() {
    if (productTypeName === "") {
      refProductTypeName.focus()
      return;
    }

    const data = {
      pid,
      productTypeName,
      productTypeCode,
    }
    props.edit({ props, data })
  }


  function onChangeTreeSelect(value) {
    setPid(value)
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

  return (
    <div className={styles.tableForm}>
      <Modal
        title="修改菜单"
        width={600}
        style={{ top: 20 }}
        visible={props.editModalvisible}
        cancelText="取消"
        okText="确定"
        confirmLoading={props.editConfirmLoading}
        onOk={() => collectData()}
        onCancel={() => props.changeEditModalvisible(false)}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">上级产品类型：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TreeSelect
                style={{ width: '100%' }}
                value={pid}
                dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                treeData={recursiveFn(list)}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={onChangeTreeSelect}
              />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">产品类型名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefProductTypeName(input)}
                onChange={e => setProductTypeName(e.target.value)}
                value={productTypeName} />
            </div>
          </div>
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  editModalvisible: state.productType.editModalvisible,
  list: state.productType.list,
  editConfirmLoading: state.productType.editConfirmLoading,
  editRecord: state.productType.editRecord,
})

const mapDispatch = dispatch => ({
  changeEditModalvisible: visible => {
    const action = creators.changeEditModalvisibleAction(visible);
    dispatch(action);
  },
  edit: req => {
    const action = creators.editAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Edit);
