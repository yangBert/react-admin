import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Oper(props) {
  return (
    <div>
      <Link to={{ pathname: '/notice/noticeAdd', state: { editId: props.record.id } }}>
        <Button
          style={{ fontSize: "12px" }}
          type="primary"
          size="small"
          ghost
        >修改</Button>&nbsp;&nbsp;
      </Link>
    </div >
  )
}


export default Oper;
