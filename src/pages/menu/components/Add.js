import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Tree } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

const { TreeNode } = Tree;

function Add(props) {
  const list = props.list
  const [treeVisible, setTreeVisible] = useState("hidden")

  const [addModalvisible, setAddModalvisible] = useState(false)

  const [parentName, setParentName] = useState("")
  const [menuFatherid, setMenuFatherid] = useState("")
  const [menuName, setMenuName] = useState("")
  const [menuRoute, setMenuRoute] = useState("")
  const [menuLogo, setMenuLogo] = useState("")




  const [refMenuName, setRefMenuName] = useState(null)
  const [refMenuRoute, setRefMenuRoute] = useState(null)
  const [refParentName, setRefParentName] = useState(null)
  const [refMenuLogo, setRefMenuLogo] = useState(null)

  const $addModalvisible = props.addModalvisible
  console.log("addModalvisibleaddModalvisible", $addModalvisible)

  useEffect(() => {
    setParentName("")
    setMenuFatherid("")
    setMenuName("")
    setMenuRoute("")
    setMenuLogo("")
    setAddModalvisible($addModalvisible)
    //setAdminName($menuName);
    console.log($addModalvisible)
  }, [$addModalvisible]);

  //新增管理员提交数据
  function collectData() {
    if (parentName === "") {
      refParentName.focus()
      return;
    } else if (menuName === "") {
      refMenuName.focus()
      return;
    } else if (menuRoute === "") {
      refMenuRoute.focus()
      return;
    } else if (menuLogo === "") {
      refMenuLogo.focus()
      return;
    }

    props.addMenu({
      menuFatherid,
      menuName,
      menuRoute,
      menuLogo,
    })

  }

  function onSelect(expandedKeys, e) {
    setMenuFatherid(expandedKeys[0])
    setParentName(e.node.props.title)
    setTreeVisible("hidden")
  };

  //递归菜单
  function mapMenuList(menus) {
    return (
      menus.map(i => {
        if (i.children && i.children.length > 0) {
          return (
            <TreeNode
              key={i.key}
              title={i.menuName}
            >
              {mapMenuList(i.children)}
            </TreeNode>
          )
        } else {
          return <TreeNode title={i.menuName} key={i.key} />
        }
      })
    )
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
              <Input
                ref={input => setRefParentName(input)}
                onFocus={e => setTreeVisible("visible")}
                value={parentName}
              />
              <div className={`${styles.tree} ${styles[treeVisible]}`}>
                <Tree onSelect={onSelect}>
                  {mapMenuList(list)}
                </Tree>
              </div>
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
