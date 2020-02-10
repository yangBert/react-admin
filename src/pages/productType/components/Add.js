import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, TreeSelect } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import $$ from 'static/js/base';

function Add(props) {
  const list = props.list
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [pid, setPid] = useState("")
  const [productTypeName, setProductTypeName] = useState("")

  const [refProductTypeName, setRefProductTypeName] = useState(null)

  const $addModalvisible = props.addModalvisible
  useEffect(() => {
    setPid("")
    setProductTypeName("")
    setAddModalvisible($addModalvisible)
  }, [$addModalvisible]);

  //新增提交数据
  function collectData() {
    if ($$.trim(productTypeName) === "") {
      refProductTypeName.focus()
      return;
    }
    const createrName = $$.localStorage.get("adminName")
    const data = {
      pid,
      productTypeName: $$.trim(productTypeName),
      createAt: createrName,
    }
    props.add({ props, data })
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
        title="新增产品类型"
        width={600}
        style={{ top: 20 }}
        visible={addModalvisible}
        cancelText="取消"
        okText="确定"
        confirmLoading={props.addConfirmLoading}
        onOk={() => collectData()}
        onCancel={() => props.changeAddModalvisible(false)}
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
  addModalvisible: state.productType.addModalvisible,
  list: state.productType.list,
  addConfirmLoading: state.productType.addConfirmLoading,
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: visible => {
    const action = creators.changeAddModalvisibleAction(visible);
    dispatch(action);
  },
  add: req => {
    const action = creators.addAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Add);
