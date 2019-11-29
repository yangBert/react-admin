import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import styles from 'pages/common/menu/menu.module.css';
import { connect } from 'react-redux';
const { SubMenu } = Menu;

class SideMenuUI extends React.Component {
  rootSubmenuKeys = this.props.menus.map(item => (
    item.id  
  ))
  state = {
    openKeys: [],
    current: "10000"
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

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const menus = this.props.menus;
    return (
      <div className={this.props.collapsed ? styles.menuMin : styles.menuMax}>
        <Menu
          //defaultSelectedKeys="100001"
          // defaultOpenKeys={menus[0] && [menus[0].id]}
          selectedKeys={[this.state.current]}
          mode="inline"
          theme="dark"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          inlineCollapsed={this.props.collapsed}
          onClick={this.handleClick}
        >
          <Menu.Item key="10000">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          {
            menus.map(p => {
              return (
                <SubMenu
                  className={styles.sliderItem}
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

const mapState = state => ({
  collapsed: state.header.collapsed
})

export default connect(mapState, null)(SideMenuUI);