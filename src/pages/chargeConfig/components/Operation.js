import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: '/chargeConfig/add',
          state: {
            appCode: props.location.state.appCode,
            record: props.record,
          }
        }}>
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
    </div >
  )
}

export default withRouter(Oper);
