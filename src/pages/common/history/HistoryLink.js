import React from 'react';
import { Breadcrumb } from 'antd';
//import styles from './style.module.css';
//import { Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import switchURL from 'router/breadcrumbNameMap';

function HistoryLink(props) {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {switchURL(url)}
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/home">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
}

export default withRouter(HistoryLink);