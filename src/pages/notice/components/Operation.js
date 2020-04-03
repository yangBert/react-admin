import React, { useState } from 'react';
import { Button, Switch } from 'antd';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import config from '../config';

function Oper(props) {
  const [state, setState] = useState(props.record.state)
  const fontSmall = { fontSize: "12px", marginLeft: "10px" };
  function publish(state) {
    const { id } = props.record;
    const data = {
      props, data: {
        state,
        publisherName: $$.localStorage.get("adminName"),
        id,
        publisher: $$.localStorage.get("adminId")
      }
    }
    props.publishNotice(data)
  }
  return (
    <div>
      <Link
        to={{
          pathname: '/notice/noticeAdd',
          state: { editId: props.record.id }
        }}>
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>&nbsp;
      <Switch
        checkedChildren="发布"
        unCheckedChildren="禁用"
        defaultChecked={state === config.state.arr[1].value ? false : true}
        onChange={checked => {
          const state = checked ? config.state.arr[4].value : config.state.arr[1].value;
          setState(state);
          publish(state)
        }}
      />
    </div >
  )
}

const mapDispatch = dispatch => ({
  publishNotice: req => {
    const action = creators.publishNoticeAction(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Oper);

