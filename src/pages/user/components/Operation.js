import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Oper(props) {
  const fontSmall = {fontSize:"12px"};

  function handleDelete() {

  }

  return (
    <div>
      <Button onClick={ e => props.changeAddModalvisible(true, "edit", props.record)} style={fontSmall} type="primary" size="small">编辑</Button>&nbsp;
      <Button onClick={handleDelete} style={fontSmall} type="primary" size="small">删除</Button>
    </div>
  )
}

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    console.log("record",record)
    const action = creators.createChangeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Oper);
