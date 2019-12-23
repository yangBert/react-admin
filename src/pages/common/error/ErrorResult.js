import React from 'react';
import { Result } from 'antd';

function ErrorResult() {
  return <Result
    status="500"
    title="500"
    style={{ marginBottom: "200px" }}
    subTitle="对不起，服务器出错了..."
  />
}

export default ErrorResult