import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, Tree } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

const { TreeNode } = Tree;

function Edit(props) {
  const list = props.list
  const [treeVisible, setTreeVisible] = useState("hidden")
  const [menuId, setMenuId] = useState("")
  //const [editModalvisible, setEditModalvisible] = useState(false)

  const [parentName, setParentName] = useState("")
  const [menuFatherid, setMenuFatherid] = useState("")
  const [menuName, setMenuName] = useState("")
  const [menuRoute, setMenuRoute] = useState("")
  const [menuLogo, setMenuLogo] = useState("")

  const [refMenuName, setRefMenuName] = useState(null)
  const [refMenuRoute, setRefMenuRoute] = useState(null)
  const [refParentName, setRefParentName] = useState(null)
  const [refMenuLogo, setRefMenuLogo] = useState(null)

  //const $editModalvisible = props.editModalvisible
  const $parentName = props.editRecord && props.editRecord.parentName
  const $menuName= props.editRecord && props.editRecord.menuName
  const $menuRoute = props.editRecord && props.editRecord.menuRoute
  const $menuLogo = props.editRecord && props.editRecord.menuLogo
  const $menuId = props.editRecord && props.editRecord.menuId
  useEffect(() => {
      setParentName($parentName)
      setMenuName($menuName)
      setMenuRoute($menuRoute)
      setMenuLogo($menuLogo)
      setMenuId($menuId)
  }, [$parentName,$menuName,$menuRoute,$menuLogo,$menuId]);

  //修改提交数据
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

    props.editMenu({
      menuFatherid,
      menuName,
      menuRoute,
      menuLogo,
      menuId,
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
        title="修改菜单"
        width={600}
        style={{ top: 20 }}
        visible={props.editModalvisible}
        cancelText="取消"
        okText="确定"
        confirmLoading={props.editConfirmLoading}
        onOk={() => collectData()}
        onCancel={() => props.changeEditModalvisible(false)}
        afterClose={() => setTreeVisible("hidden")}
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
  editModalvisible: state.menu.editModalvisible,
  list: state.menu.list,
  editConfirmLoading: state.menu.editConfirmLoading,
  editRecord: state.menu.editRecord,
})

const mapDispatch = dispatch => ({
  changeEditModalvisible: visible => {
    const action = creators.changeEditModalvisibleAction(visible);
    dispatch(action);
  },
  editMenu: req => {
    const action = creators.editMenuAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Edit);
