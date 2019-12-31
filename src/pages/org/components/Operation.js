import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import $$ from 'static/js/base';

function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  return (
    <div>
      <Link to={{ pathname: '/org/orgAdd', state: { record: props.record, list: props.list } }}>
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>&nbsp;&nbsp;
      <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        defaultChecked={props.record.state === 'NORMAL' ? true : false}
        onChange={checked => {
          const state = checked ? 'NORMAL' : 'INVILD'
          const userNo = $$.localStorage.get("adminId")
          const orgCode = props.record.orgCode
          const data = {
            state,
            id: props.record.id,
            orgCode,
            userNo
          }
          props.updateOrgUpdate({ props, data })
        }}
      />

    </div >
  )
}

const mapState = state => ({
  list: state.org.list,
})

const mapDispatch = dispatch => ({
  updateOrgUpdate: req => {
    const action = creators.updateOrgUpdateAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(Oper));
