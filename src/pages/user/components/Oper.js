import React from 'react';
import { Button } from 'antd';

function Oper() {
  const fontSmall = {fontSize:"12px"};
  return (
    <div>
      <Button style={fontSmall} type="primary" size="small">删除</Button>&nbsp;
      <Button style={fontSmall} type="primary" size="small">详情</Button>
    </div>
  )
}
export default Oper;
