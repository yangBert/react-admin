import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from 'router';
import styles from 'pages/home/home.module.css'
import SideMenu from 'pages/common/menu/SideMenu';
import Header from 'pages/common/header/Header';
import { Spin } from 'antd';

function Home() {
  return (
    <div>
      <Header className={styles.header} />
      <Router>
        <div className={styles.sideMenu}>
          <SideMenu />
        </div>
        <div className={styles.pageContainer}>
          <div className={styles.pageContent}>
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


export default Home;