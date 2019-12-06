import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from 'router';
import { withRouter } from 'react-router';
import styles from 'pages/index/index.module.css';
import SideMenu from 'pages/common/menu/SideMenu';
import Header from 'pages/common/header/Header';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import PropsContext from './props';

function IndexHome(props) {
  return (
    <div>
      <Router>
        <PropsContext.Provider value={props}>
          <div className={styles.sideMenu}>
            <SideMenu />
          </div>
          <div className={props.collapsed ? styles.paddingMin : styles.paddingMax}>
            <Header propsGlobal={props} className={styles.header} />
            <div className={props.collapsed ? styles.contentMin : styles.contentMax}>

              {/* <Suspense fallback={<Spin />}> */}
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
        </PropsContext.Provider>
      </Router >
    </div>
  );
}

const mapState = state => ({
  collapsed: state.header.collapsed,
  loginState: state.login.loginState,
})

export default withRouter(connect(mapState, null)(IndexHome));