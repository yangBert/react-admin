import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, TreeSelect } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Add(props) {
  const list = props.list
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [menuFatherid, setMenuFatherid] = useState("")
  const [menuName, setMenuName] = useState("")
  const [menuRoute, setMenuRoute] = useState("")
  const [menuLogo, setMenuLogo] = useState("")




  const [refMenuName, setRefMenuName] = useState(null)
  const [refMenuRoute, setRefMenuRoute] = useState(null)
  const [refMenuLogo, setRefMenuLogo] = useState(null)

  const $addModalvisible = props.addModalvisible
  useEffect(() => {
    setMenuFatherid("")
    setMenuName("")
    setMenuRoute("")
    setMenuLogo("")
    setAddModalvisible($addModalvisible)
    //setAdminName($menuName);
  }, [$addModalvisible]);

  //新增管理员提交数据
  function collectData() {
    if (menuName === "") {
      refMenuName.focus()
      return;
    } else if (menuRoute === "") {
      refMenuRoute.focus()
      return;
    } else if (menuLogo === "") {
      refMenuLogo.focus()
      return;
    }

    const data = {
      menuFatherid,
      menuName,
      menuRoute,
      menuLogo,
    }
    props.addMenu({ props, data })

  }

  function onChangeTreeSelect(value) {
    setMenuFatherid(value)
  }

  //递归
  function recursiveFn(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].title = arr[i].menuName
      arr[i].value = arr[i].menuId
      if (arr[i].children && arr[i].children.length > 0) {
        recursiveFn(arr[i].children)
      }
    }
    return arr;
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title="新增菜单"
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
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">上级菜单：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TreeSelect
                style={{ width: '100%' }}
                value={menuFatherid}
                dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                treeData={recursiveFn(list)}
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={onChangeTreeSelect}
              />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">菜单名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefMenuName(input)}
                onChange={e => setMenuName(e.target.value)}
                value={menuName} />
            </div>
          </div>

          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">路由地址：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefMenuRoute(input)}
                onChange={e => setMenuRoute(e.target.value)}
                value={menuRoute}
              />
            </div>
          </div>

          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">菜单图标：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefMenuLogo(input)}
                onChange={e => setMenuLogo(e.target.value)}
                value={menuLogo}
              />
            </div>
          </div>
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  addModalvisible: state.menu.addModalvisible,
  list: state.menu.list,
  addConfirmLoading: state.menu.addConfirmLoading,
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: visible => {
    const action = creators.changeAddModalvisibleAction(visible);
    dispatch(action);
  },
  addMenu: req => {
    const action = creators.addMenuAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Add);
