import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  return (
    <div>
      <Link to={{ pathname: '/cert/certDetail', state: { detailInfo: props.record } }}>
        <Button
          // onClick={() => props.detailApp({ props, data: props.record })}
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >详情</Button>
      </Link>
    </div >
  )
}

export default Oper;
