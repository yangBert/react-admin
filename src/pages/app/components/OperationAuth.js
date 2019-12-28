import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {

  return (
    <div>
      <Link to={{ pathname: '/app/detail', state: { editAppId: props.record.id, rowauditStatus: props.record.auditStatus } }}>
        <Button
          // onClick={() => props.detailApp({ props, data: props.record })}
          style={{ fontSize: "12px" }}
          type="primary"
          size="small"
          ghost
        >详情</Button>
      </Link>
    </div >
  )
}

const mapState = state => ({
  params: state.app.params,
})

const mapDispatch = dispatch => ({
  changeAppStatus: req => {
    const action = creators.createChangeAppStatusAction(req);
    dispatch(action);
  },
  showSecret: req => {
    const action = creators.showSecretAction(req);
    dispatch(action);
  },

})

export default withRouter(connect(mapState, mapDispatch)(Oper));
