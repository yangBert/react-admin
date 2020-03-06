import React from 'react';
import { Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/verifyServer/detail",
          state: { record: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >详情</Button>
      </Link>

    </div >
  )
}

export default withRouter(Oper);
