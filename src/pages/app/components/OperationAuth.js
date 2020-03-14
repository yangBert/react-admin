import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {

  return (
    <div>
      <Link
        to={{
          pathname: '/app/detail',
          state: {
            editAppId: props.record.id,
            rowauditStatus: props.record.auditStatus,
            allLandingModes: props.allLandingModes,
            allSupportCAs: props.allSupportCAs,
            allAppTypes: props.allAppTypes,
            allAuthLevel: props.allAuthLevel
          }
        }}>
        <Button
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
  allLandingModes: state.app.form.allLandingModes,
  allSupportCAs: state.app.form.allSupportCAs,
  allAppTypes: state.app.form.allAppTypes,
  allAuthLevel: state.app.form.allAuthLevel,
  allProductType: state.app.allProductType
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
