import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from 'router';
import styles from 'pages/home/home.module.css';
import SideMenu from 'pages/common/menu/SideMenu';
import Header from 'pages/common/header/Header';
import { Spin } from 'antd';
import { connect } from 'react-redux';


class Home extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div className={styles.sideMenu}>
            <SideMenu />
          </div>
          <div className={this.props.collapsed ? styles.paddingMin : styles.paddingMax}>
            <Header className={styles.header} />
            <div className={this.props.collapsed ? styles.contentMin : styles.contentMax}>
              <Suspense fallback={<Spin />}>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    component={route.component}
                  />
                ))}
              </Suspense>
            </div>
          </div>
        </Router >
      </div>
    );
  }

}

const mapState = state => ({
  collapsed: state.header.collapsed
})

export default connect(mapState, null)(Home);