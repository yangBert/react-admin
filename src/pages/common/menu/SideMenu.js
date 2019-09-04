import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
const { SubMenu } = Menu;

class SideMenu extends React.Component {
  rootSubmenuKeys = this.props.menus.map(item => (
    item.id
  ))
  state = {
    openKeys: [this.props.menus[0].id],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const menus = this.props.menus;
    return (
      <div style={{ width: 256 }}>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button> */}
        <Menu
          defaultSelectedKeys={[menus[0].childs[0].id]}
          defaultOpenKeys={[menus[0].id]}
          mode="inline"
          theme="dark"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {
            menus.map(p => {
              return (
                <SubMenu
                  key={p.id}
                  title={
                    <span>
                      <Icon type={p.icon} />
                      <span>{p.title}</span>
                    </span>
                  }
                >
                  {
                    p.childs.map(c => (
                      <Menu.Item key={c.id}><Link to={c.path}>{c.title}</Link></Menu.Item>
                    ))
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </div>
    );
  }
}
const mapState = state => {
  console.log(state.sideMenu.menus);
  return {
    menus: state.sideMenu.menus
  }
}

// const mapDispatch = dispatch => {
//   return {

//   }
// }

export default connect(mapState, null)(SideMenu);