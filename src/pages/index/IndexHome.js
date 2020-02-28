import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from 'router';
import { withRouter } from 'react-router';
import styles from 'pages/index/index.module.css';
import SideMenu from 'pages/common/menu/SideMenu';
import Header from 'pages/common/header/Header';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import $$ from 'static/js/base.js';
import PropsContext from './props';
import NoMatch from 'pages/common/error/NotFind';

function IndexHome(props) {
  window.$GLOBALPROPS = props
  return (
    <div>
      <Router>
        <PropsContext.Provider value={props}>
          {
            //$$.token.get() ?
              <div>
                <div className={styles.sideMenu}>
                  <SideMenu />
                </div>
                <div className={props.collapsed ? styles.paddingMin : styles.paddingMax}>
                  <Header propsGlobal={props} className={styles.header} />
                  <div className={props.collapsed ? styles.contentMin : styles.contentMax}>
                    <Suspense fallback={<Spin />}>
                      <Switch>
                        {routes.map((route, index) => (
                          <Route
                            exact
                            key={index}
                            path={route.path}
                            component={route.component}
                          />
                        ))}
                        <Route path="*">
                          <NoMatch />
                        </Route>
                        <Route path="*/500">
                          <NoMatch />
                        </Route>
                      </Switch>
                    </Suspense>
                  </div>
                </div>
              </div> //: "" //$$.logout(props)
          }
        </PropsContext.Provider>
      </Router >
    </div>
  );
}

const mapState = state => ({
  collapsed: state.header.collapsed,
})

export default withRouter(connect(mapState, null)(IndexHome));