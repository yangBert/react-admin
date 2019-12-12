import React from 'react';
import { Result, Button } from 'antd';

function ErrorResult() {
  return <Result
    status="500"
    title="500"
    subTitle="Sorry, the server is wrong."
    extra={<Button type="primary">Back Home</Button>}
  /> 
}

export default ErrorResult