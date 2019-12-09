import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import './reset.css';
import './static/plugins/gzca/css/gzca.css';
import App from './App';
import {ConfigProvider } from 'antd';

const app = () => (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)

ReactDOM.render(app(), document.getElementById('root'));
