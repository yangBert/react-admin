import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
        onClick={() => props.changeModalVisible(true, props.record)}
      >修改</Button>
      <Link
        to={{
          pathname: "/clientUser/detail",
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

const mapState = state => ({
  modalVisible: state.clientUser.modalVisible,
  editStatus: state.clientUser.editStatus,
  spinning: state.clientUser.spinning,
})

const mapDispatch = dispatch => ({

  changeModalVisible: (visible, record) => {
    const action = creators.changeModalVisibleAction(visible, record);
    dispatch(action);
  },
  update: req => {
    const action = creators.updateAction(req);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(Oper));
