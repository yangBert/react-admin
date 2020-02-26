import React from 'react';
import { Button, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';
import $$ from 'static/js/base';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/link/add",
          state: { editRecord: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
      {
        <Switch
          style={fontSmall}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={props.record.status === "NORMAL" ? true : false}
          onChange={checked => {
            const status = checked ? "NORMAL" : "INVILD"
            const userNo = $$.localStorage.get("adminId")
            const data = {
              userNo,
              id: props.record.id,
              status
            }
            props.updateState({ props, data })
          }}
        />
      }
    </div >
  )
}

const mapDispatch = dispatch => ({
  updateState: req => {
    const action = creators.updateStateAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(Oper));
