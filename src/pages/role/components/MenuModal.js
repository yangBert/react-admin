import React from 'react';
import { Modal, Tree } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


const { TreeNode } = Tree;

class MenuModal extends React.Component {

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    submitData: {}
  };

  componentDidMount() {
    this.props.queryMenuList({});
  }

  createSubmitData = () => {
    let keys = this.props.checkedKeys
    let arr = []
    for (let i = 0; i < keys.length; i++) {
      let o = {
        userType: '1',
        userId: this.props.selectedRoleId,
        menuId: keys[i]
      }
      arr.push(o)
    }
    this.props.roleBindMenu(arr)
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
    this.props.changeCheckedKeys(checkedKeys)
  };

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.menuName} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });
  render() {
    return (
      <div>
        <Modal
          title="权限配置"
          style={{ top: 20 }}
          width={360}
          bodyStyle={{ height: "300px", overflow: "auto" }}
          visible={this.props.menuModalvisible}
          confirmLoading={this.props.ConfirmLoading}
          onOk={() => this.createSubmitData()}
          onCancel={() => this.props.changeMenuModalvisible(false)}
        >
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.props.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.props.menuList)}
          </Tree>
        </Modal>
      </div>
    )
  }


}

const mapState = state => ({
  menuModalvisible: state.role.menuModalvisible,
  menuList: state.role.menuList,
  haveMenuList: state.role.haveMenuList,
  selectedRoleId: state.role.selectedRoleId,
  checkedKeys: state.role.checkedKeys,
  ConfirmLoading: state.role.ConfirmLoading,
})

const mapDispatch = dispatch => ({
  changeMenuModalvisible: menuModalvisible => {
    const action = creators.menuModalvisibleAction(menuModalvisible);
    dispatch(action);
  },
  queryMenuList: requestData => {
    const action = creators.queryMenuAction(requestData);
    dispatch(action);
  },
  roleBindMenu: requestData => {
    const action = creators.roleBindMenuAction(requestData);
    dispatch(action);
  },
  changeCheckedKeys: checkedKeys => {
    const action = creators.changeCheckedKeysAction(checkedKeys);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(MenuModal);
